import * as esbuild from "esbuild-wasm";
import React from "react";
import { createRoot } from "react-dom/client";
import CodeEditor from "./components/codeEditor.component";
import { unpkgPathPlugin } from "./plugins/customPlugin";
import { fetchPlugin } from "./plugins/fetchPlugin";

const App = () => {
	const iframe = React.useRef<any>();
	const [input, setInput] = React.useState("");
	const ref = React.useRef<any>();
	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		});
	};
	const onClick = async () => {
		if (!ref.current) {
			return;
		}
		iframe.current.srcdoc = html;
		const result = await ref.current.build({
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				"process.env.NODE_ENV": '"production"',
				global: "window",
			},
		});

		// setCode(result.outputFiles[0].text);
		iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
	};

	React.useEffect(() => {
		startService();
	}, []);

	const html = `
	<html>
		<head></head>
		<body>
			<div id="root"></div>
			<script>
				window.addEventListener('message', (event) => {
					try {
						eval(event.data);
					} catch(e) {
						const root = document.querySelector('#root');
						root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + e + '</div>';
						console.error(e);
					}
					
				}, false)
			</script>
		</body>
	</html>
	`;

	return (
		<div>
			<CodeEditor
				initialValue="const a = 12;"
				onChange={(value) => setInput(value)}
			/>
			<textarea
				onChange={(e) => setInput(e.target.value)}
				value={input}></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<iframe
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
		</div>
	);
};

const container = document.querySelector("#root") as HTMLElement;

const root = createRoot(container);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
