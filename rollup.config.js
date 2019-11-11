import pkg from './package.json';
import {terser} from "rollup-plugin-terser";

export default [{
	input: 'src/index.js',
	plugins: [terser()],
    output: [
        { file: pkg.browser, format: 'cjs' },
        { file: pkg.module, format: 'es' },
        { file: pkg.unpkg, format: 'umd', name: 'nosleep' },
    ],
}];
