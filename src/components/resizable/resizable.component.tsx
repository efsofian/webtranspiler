import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
	direction: "horizontal" | "vertical";
	children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;
	const [innerHeight, setInnerHeight] = React.useState(
		() => window.innerHeight
	);
	const [innerWidth, setInnerWidth] = React.useState(() => window.innerWidth);
	const [width, setWidth] = React.useState(() => window.innerWidth * 0.75);
	React.useEffect(() => {
		let timer: any;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75);
				}
			}, 500);
		};
		window.addEventListener("resize", listener);
		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [width]);
	if (direction === "horizontal") {
		resizableProps = {
			className: "resizable-horizontal",
			height: Infinity,
			width,
			resizeHandles: ["e"],
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			height: 300,
			width: Infinity,
			resizeHandles: ["s"],
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight * 0.9],
		};
	}
	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
