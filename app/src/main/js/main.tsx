import React from "react";
import ReactDOM from "react-dom";

import { Stuff } from "@wasm-lib/wasm-lib";

const stuff = new Stuff();
stuff.refThing("woo");

const target = document.getElementById("root");
ReactDOM.render(<div>Hello</div>, target);
