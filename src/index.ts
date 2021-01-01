import './style.css';
import { hello } from './hello.ts';

document.getElementById('app').innerHTML = `
<h1>${hello()}!!!!<h1>
`;
