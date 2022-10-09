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

