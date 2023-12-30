import React from "react";
import '@fontsource/roboto/400.css';
import "./App.css";
import { Github } from "./component/githubUsers/githubUsers";

function App() {
  return (
    <div className="App">
      <h1 style={{ padding: "20px" }}>Search GitHub Users</h1>
      <Github />
    </div>
  );
}

export default App;
