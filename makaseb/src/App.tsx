import React from "react";
import logo from "./assets/images/logo.png";
import "./App.css";
import appStyles from "./App.module.css";
import "@fontsource/roboto";
import { Layout } from "./presentation/core/layOut/Layout";
import { Logo } from "./presentation/core/logo/Logo";
function App() {
  return (
    <div className="App">
      <Layout>
        <header className={appStyles["App-header"]}>
          <Logo></Logo>
          {/*           <img src={logo} className="App-logo" alt="logo" />
           */}{" "}
          <p>Edit src/App.tsx and savne to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </Layout>
    </div>
  );
}

export default App;
