import "./App.css";
import Graph from "./components/Graph";
import Metrics from "./components/Metrics";
import Setup from "./components/Setup";
import { OptionsProvider } from "./components/context/options";
import { Stack } from "@mui/material";

function App() {
  return (
    <>
      <header className="main-header">
        <p>scm: control panel</p>
      </header>
      <div className="main">
        <OptionsProvider>
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="space-around"
            className="main-container"
          >
            <Setup />
            <Metrics />
            <Graph />
          </Stack>
        </OptionsProvider>
      </div>
    </>
  );
}

export default App;
