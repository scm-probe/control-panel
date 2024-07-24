import "./App.css";
import Graph from "./components/Graph";
import Metrics from "./components/Metrics";
import Setup from "./components/Setup";
function App() {
  return (
    <>
      <header className="main-header">
        <p>scm: control panel</p>
      </header>
      <div className="main">
        <div className="main-container">
          <Setup />
          <Metrics />
          <Graph />
        </div>
      </div>
    </>
  );
}

export default App;
