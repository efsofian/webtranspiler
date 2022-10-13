Component.displayName // en cas de debugging

React.FC // no longer produce typing for children in react 18
=> children?: React.ReactNode

no need to type event handler inline
but if define as separated function, need to type e. // depend of the html element

useState<StateType>(state) // need generic if ts cant infer properly

class:
interface PropsInt {
	users: {
		name: string;
		age: number;
	}[]
}

interface StateInt {
	name: string;
	user: { name: string; age: number } | undefined;
}

class XX extends React.Component<PropsInt, StateInt> { 
	state = { // on peut aussi state: StateInt ici
		name: ''
	}
	render() {
		return <div>this.state.name</div>
	}
}

ref:
const inputRef = useRef<HTMLInputElement | null>(null); // built in interface html input element

ESBUILD // stand alone compiler // remplace babel et webpack // can run on browser // very fast
npm install --save-exact esbuild-wasm@0.8.27

<pre></pre> // preview de text facon code

unpkg // public cdn with all npmregistry content


new URL("./utils", "https://unpkg.com/medium-test-pkg") // 1: path 2: root // { href: goodurl }
permet de generer le bon url  ./xx ou ../xx // ca vire le relatif

si request to url and response redirect to a new url
to acces the new url : { request: { responseURL}} // via axios

IndexDB // db in the browser
lib helper: localforage from npm // fallback to localstorage if user dont have indexdb
await localforage.getItem() // setItem
import localForage from "localforage";

const fileCache = localForage.createInstance({
	name: 'filecache'
});

iframe for security input user app
iframe => imbedd a .html into another
liframe a un context qui lui est propre (scoped)
comunnication: // by default
from parent to child: document.querySelector("#childIframe").contentWindow
from child to parent: parent.xx
direct communication allowed if:
no sandbox property or sandbox="allow-same-origin"
for communication allowed, all of theses must be true:
need same domain
need same port
need same protocol (http or https)
prop srcDoc=localString instead of src=outsideHtmlFile
=> sourceDoc et sandbox="" === no localStorage car no Window.

eval(str) // permet dexec du code js sous passer sous forme de string

open source browser editor:
-codemirror // easy
-ace editor // medium
-monaco editor // hard