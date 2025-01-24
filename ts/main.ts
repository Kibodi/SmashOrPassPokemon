import { Starter } from "./introduction.js";
let start:Starter = new Starter();
document.body.onload = start.start.bind(start);
