import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { baseUrl } from "./komponents/DirektorPage/constants";
axios.defaults.baseURL = baseUrl;

ReactDOM.render(<App />, document.getElementById("root"));
