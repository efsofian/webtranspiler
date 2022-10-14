import "bulmaswatch/superhero/bulmaswatch.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import CodeCell from "./components/codeCell/codeCell.component";

const App = () => {
	return (
		<div>
			<CodeCell />
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
