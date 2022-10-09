import * as esbuild from "esbuild-wasm";
import React from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/customPlugin";

const App = () => {
	const [input, setInput] = React.useState("");
	const [code, setCode] = React.useState("");
	const ref = React.useRef<any>();
	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: "/esbuild.wasm",
		});
	};
	const onClick = async () => {
		if (!ref.current) {
			return;
		}
		const result = await ref.current.build({
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()],
			define: {
				"process.env.NODE_ENV": '"production"',
				global: "window",
			},
		});
		console.log(result);
		setCode(result.outputFiles[0].text);
	};

	React.useEffect(() => {
		startService();
	}, []);
	return (
		<div>
			<textarea
				onChange={(e) => setInput(e.target.value)}
				value={input}></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
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
