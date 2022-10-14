import "bulmaswatch/superhero/bulmaswatch.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import TextEditor from "./components/textEditor/textEditor.component";

const App = () => {
	return (
		<div>
			<TextEditor />
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
