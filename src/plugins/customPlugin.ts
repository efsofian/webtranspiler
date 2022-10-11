import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
	name: "filecache",
});

(async () => {
	await fileCache.setItem("color", "red");
	const color = await fileCache.getItem("color");
	console.log(color);
})();

export const unpkgPathPlugin = () => {
	return {
		name: "unpkg-path-plugin",
		setup(build: esbuild.PluginBuild) {
			// root entry file
			build.onResolve({ filter: /^index\.js$/ }, () => {
				return { path: "index.js", namespace: "a" };
			});

			// relative path in a module
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: "a",
					path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
						.href,
				};
			});

			// main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`,
				};
			});
		},
	};
};
