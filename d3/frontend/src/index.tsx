import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import ModelScreen from "./screens/ModelScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route exact path="/:modelName" component={ModelScreen} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
