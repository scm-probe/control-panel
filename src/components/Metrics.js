import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Plot, timeFormatter, NINETEEN_EIGHTY_FOUR, fromFlux } from "@influxdata/giraffe";

const MetricsCard = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const csv_res = await fetch(
          "http://localhost:1910/metrics?query=derivative",
          { cache: "no-store" }
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
    getData();
  }, []);

  const valueAxisLabel = "GB";

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

  return (
    <Card variant='outlined' sx={{ width: "100%", backgroundColor: '#18181b', marginTop: 2 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ fontSize: 24, color: "white", alignSelf: "flex-start" }}>
          Metrics Graph
        </Typography>
        {loading && <CircularProgress sx={{ color: "white" }} />}
        {error && <Typography sx={{ color: "red" }}>Error: {error.message}</Typography>}
        <div style={{ width: '100%', height: '600px' }}>
          {table && <Plot config={lineConfig} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
