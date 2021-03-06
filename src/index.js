import React from "react";
import ReactDOM from "react-dom";
import Layout from './components/Layout/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// The whole application starts pretty much here
ReactDOM.render(
    <Router>
        <Layout />
    </Router>,
    document.getElementById("root")
);
