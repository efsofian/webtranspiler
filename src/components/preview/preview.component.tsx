import React from "react";
import "./preview.css";

interface PreviewProps {
	code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = React.useRef<any>();
	React.useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, "*");
		}, 100);
	}, [code]);
	return (
		<div className="preview-wrapper">
			<iframe
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}></iframe>
		</div>
	);
};

export default Preview;