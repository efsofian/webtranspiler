import React from "react";
import Preview from "../preview/preview.component";
import CodeEditor from "../codeEditor/codeEditor.component";
import Resizable from "../resizable/resizable.component";
import bundler from "../../bundler";

const CodeCell = () => {
	const [code, setCode] = React.useState("");
	const [input, setInput] = React.useState("");
	const [err, setErr] = React.useState("");

	React.useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(input);
			setCode(output.code);
			setErr(output.err);
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue="const secretOfLife = 42;"
						onChange={(value) => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
