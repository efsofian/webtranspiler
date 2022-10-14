import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "./textEditor.css";

const TextEditor: React.FC = () => {
	const [value, setValue] = React.useState("**Hello world!!!**");
	const [editing, setEditing] = React.useState(false);
	const ref = React.useRef<HTMLDivElement | null>(null);
	React.useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener("click", listener, { capture: true });

		return () => {
			document.removeEventListener("click", listener, { capture: true });
		};
	}, []);
	if (editing) {
		return (
			<div ref={ref}>
				<MDEditor value={value} onChange={(val) => setValue(val as string)} />
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)}>
			<MDEditor.Markdown source={"# Header"} />
		</div>
	);
};

export default TextEditor;
