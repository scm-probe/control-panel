import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import Graphviz from "graphviz-react";
import { useOptions } from "./context/options";

const GraphCard = () => {
  const [dot, setDot] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { graph } = useOptions();

  useEffect(() => {
    const getDot = async () => {
      try {
        const call = await fetch("http://localhost:1910/graph", {
          cache: "no-store",
        });
        const dot = await call.text();
        setDot(dot);
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    setInterval(() => {
      if (graph === true) {
        getDot();
      }
    }, 15000);
  }, [graph]);

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", backgroundColor: "#18181b", marginTop: 2 }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 24, color: "white", alignSelf: "flex-start" }}
        >
          System Call Sequence{" "}
          {graph && loading && <CircularProgress sx={{ color: "white" }} />}
        </Typography>
        {graph ? (
          <div
            style={{ width: "100%", overflowX: "auto", textAlign: "center" }}
          >
            {error && (
              <Typography sx={{ color: "red" }}>
                Error: {error.message}
              </Typography>
            )}
            {dot && (
              <Graphviz
                dot={dot}
                options={{
                  fit: false,
                  zoom: true,
                  zoomScaleExtent: [0.5, 6],
                  width: 1200,
                  height: 600,
                }}
              />
            )}
          </div>
        ) : (
          <Typography sx={{ fontSize: 18, color: "white" }}>
            {" "}
            Graph not enabled.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GraphCard;
