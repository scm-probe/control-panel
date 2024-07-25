import "./App.css";
import Graph from "./components/Graph";
import Metrics from "./components/Metrics";
import Setup from "./components/Setup";
import { OptionsProvider } from "./components/context/options";

function App() {
  return (
    <>
      <header className="main-header">
        <p>scm: control panel</p>
      </header>
      <div className="main">
        <OptionsProvider>
        <div className="main-container">
          <Setup />
          <Metrics />
          <Graph />
        </div>
        </OptionsProvider>
      </div>
    </>
  );
}

export default App;
