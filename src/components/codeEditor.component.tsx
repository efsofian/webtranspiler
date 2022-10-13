import React from "react";
import MonacoEditor, { OnMount as OnMountType } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
	initialValue: string;
	onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
	const editorRef = React.useRef<any>();

	const onMountChange: OnMountType = (editor, monacoEditor) => {
		editorRef.current = editor;
		editor.onDidChangeModelContent(() => {
			onChange(editorRef.current.getValue());
		});
	};
	const handleFormat = () => {
		const unformatted = editorRef.current.getValue();
		const formatted = prettier.format(unformatted, {
			parser: "babel",
			plugins: [parser],
			useTabs: false,
			semi: true,
			singleQuote: true,
		});
		editorRef.current.setValue(formatted);
	};
	return (
		<div>
			<button onClick={handleFormat}>Format</button>
			<MonacoEditor
				onMount={onMountChange}
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
		</div>
	);
};

export default CodeEditor;
