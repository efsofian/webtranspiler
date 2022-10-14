import React from "react";
import Preview from "../preview/preview.component";
import CodeEditor from "../codeEditor/codeEditor.component";
import Resizable from "../resizable/resizable.component";
import bundler from "../../bundler";

const CodeCell = () => {
	const [code, setCode] = React.useState("");
	const [input, setInput] = React.useState("");

	const onClick = async () => {
		const output = await bundler(input);

		setCode(output);
	};

	return (
		<Resizable direction="vertical">
			<div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
				<CodeEditor
					initialValue="const secretOfLife = 42;"
					onChange={(value) => setInput(value)}
				/>
				<Preview code={code} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
