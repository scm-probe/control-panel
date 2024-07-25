import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import { useOptions } from "./context/options";

const SetupCard = (props) => {
  const [checked, setChecked] = useState({
    id: false,
    name: false,
    graph: false,
    metrics: false,
  });
  const [textFieldValue, setTextFieldValue] = useState("");
  const { setOptions } = useOptions();

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked,
      ...(name === "id" && checked ? { name: false } : {}),
      ...(name === "name" && checked ? { id: false } : {}),
    }));
  };

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleButtonClick = async (e) => {
    setOptions(checked);
    const data = await fetch("http://localhost:1910/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: textFieldValue,
        dataType: checked.id ? "id" : "name",
        graph: checked.graph,
      }),
    });
    if (data.status === 200) {
      console.log("Success");
    }
  };

  const handleCloseButtonClick = async (e) => {
    setOptions({ id: false, name: false, graph: false, metrics: false });
    const data = await fetch("http://localhost:1910/stop");
    if (data.status === 200) {
      console.log("Success");
    }
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", backgroundColor: "#18181b" }}>
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
          {props.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          {["id", "name", "graph", "metrics"].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={checked[label]}
                  onChange={handleChange}
                  name={label}
                  disabled={
                    (label === "id" && checked.name) ||
                    (label === "name" && checked.id)
                  }
                  sx={{ color: "white" }}
                />
              }
              label={<Typography sx={{ color: "white" }}>{label}</Typography>}
            />
          ))}
        </Box>
        <TextField
          sx={{
            marginTop: 2,
            backgroundColor: "#121212",
            borderRadius: 1,
            mb: 4,
            color: "white",
          }}
          label={
            checked.id
              ? "Enter ID"
              : checked.name
                ? "Enter Name"
                : "Enter ID or Name"
          }
          value={textFieldValue}
          onChange={handleTextFieldChange}
          disabled={!checked.id && !checked.name}
          InputProps={{
            style: {
              color: "white",
            },
          }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="large" onClick={handleButtonClick}>
            inject bpf code
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            onClick={handleCloseButtonClick}
          >
            stop
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SetupCard;
