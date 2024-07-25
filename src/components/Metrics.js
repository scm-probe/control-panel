import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  Plot,
  timeFormatter,
  NINETEEN_EIGHTY_FOUR,
  fromFlux,
} from "@influxdata/giraffe";
import { useOptions } from "./context/options";

const MetricsCard = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { metrics } = useOptions();
  const [query, setQuery] = useState("derivative");

  useEffect(() => {
    const getData = async () => {
      try {
        const csv_res = await fetch(
          `http://localhost:1910/metrics?query=${query}`,
          { cache: "no-store" },
        );
        const csv = await csv_res.text();
        const table = fromFlux(csv);
        setTable(table);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    setInterval(() => {
      if (metrics === true) {
        getData();
      }
    }, 15000);
  }, [metrics, query]);

  const valueAxisLabel = "CPS";

  const lineLayer = {
    type: "line",
    x: "_time",
    y: "_value",
    position: "overlaid",
    interpolation: "monotoneX",
    colors: NINETEEN_EIGHTY_FOUR,
    lineWidth: 1,
    hoverDimension: "auto",
    shadeBelow: true,
    shadeBelowOpacity: 0.1,
  };

  const lineConfig = table
    ? {
        table: table.table,
        valueFormatters: {
          _time: timeFormatter({
            timeZone: "GMT",
            format: "HH:mm",
          }),
          _value: (val) =>
            `${val.toFixed(2)}${
              valueAxisLabel ? ` ${valueAxisLabel}` : valueAxisLabel
            }`,
        },
        xScale: "linear",
        yScale: "linear",
        legendFont: "12px sans-serif",
        tickFont: "12px sans-serif",
        showAxes: true,
        layers: [lineLayer],
      }
    : null;

  const handleToggleChange = (_, newQuery) => {
    setQuery(newQuery);
    setTable(null);
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", backgroundColor: "#18181b", marginTop: 2 }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <Typography
          sx={{ fontSize: 24, color: "white", alignSelf: "flex-start" }}
        >
          Metrics Graph{" "}
          {metrics && loading && <CircularProgress sx={{ color: "white" }} />}
        </Typography>
        <ToggleButtonGroup
          color="secondary"
          value={query}
          exclusive
          onChange={handleToggleChange}
          aria-label="Platform"
        >
          <ToggleButton value="derivative">Derivative</ToggleButton>
          <ToggleButton value="double_derivative">
            Double Derivative
          </ToggleButton>
          <ToggleButton value="ema">EMA</ToggleButton>
          <ToggleButton value="increase">Increase</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {metrics ? (
          <div style={{ width: "100%", height: "600px" }}>
            {error && (
              <Typography sx={{ color: "red" }}>
                Error: {error.message}
              </Typography>
            )}
            {table && <Plot config={lineConfig} />}
          </div>
        ) : (
          <Typography sx={{ color: "white" }}>Metrics Not Enabled</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
