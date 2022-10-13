import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
	initialValue: string;
	onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
	const onEditorChange = (value: any, monacoEditor: any) => {
		onChange(value);
	};
	return (
		<MonacoEditor
			onChange={onEditorChange}
			value={initialValue}
			theme="vs-dark"
			language="javascript"
			height="500px"
			options={{
				wordWrap: "on",
				minimap: { enabled: false },
				showUnused: false,
				folding: false,
				lineNumbersMinChars: 3,
				fontSize: 16,
				scrollBeyondLastLine: false,
				automaticLayout: true,
			}}
		/>
	);
};

export default CodeEditor;