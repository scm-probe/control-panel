import React, {useState} from 'react'
import { Button, Card, CardContent, Typography, FormControlLabel, Checkbox, Box, TextField } from '@mui/material'

const SetupCard = (props) => {
  const [checked, setChecked] = useState({
    id: false,
    name: false,
    graph: false,
    metrics: false,
  });
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked,
      ...(name === 'id' && checked ? { name: false } : {}),
      ...(name === 'name' && checked ? { id: false } : {}),
    }));
  };

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };
  return (
    <Card variant='outlined' sx={{width: "100%", backgroundColor:'#18181b'}}>
      <CardContent sx={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <Typography sx={{fontSize: 24, color: "white", alignSelf:"flex-start"}}>{props.title}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
          {['id', 'name', 'graph', 'metrics'].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={checked[label]}
                  onChange={handleChange}
                  name={label}
                  disabled={(label === 'id' && checked.name) || (label === 'name' && checked.id)}
                  sx={{ color: "white" }}
                />
              }
              label={<Typography sx={{ color: "white" }}>{label}</Typography>}
            />
          ))}
        </Box>
        <TextField
          sx={{ marginTop: 2, backgroundColor: '#121212', borderRadius: 1 , mb: 4, color:"white"}}
          label={checked.id ? "Enter ID" : checked.name ? "Enter Name" : "Enter ID or Name"}
          value={textFieldValue}
          onChange={handleTextFieldChange}
          disabled={!checked.id && !checked.name}
          InputProps={{
            style: {
              color: 'white',
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
        />
        <Button variant='outlined' size="large">inject bpf code</Button>
      </CardContent>
    </Card>
  )
}

export default SetupCard