import React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from "@mui/material";

export default function RegisterForm() {
  const [vehicleType, setVehicleType] = React.useState("");
  const [otherVehicleType, setOtherVehicleType] = React.useState("");

  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };

  return (
    <Box component="form" sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registro de Conductor
      </Typography>

      <TextField
        label="ID de Conductor"
        placeholder="Ej: 291753"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Nombre y apellido"
        placeholder="Ej: Juan Pérez"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Número de teléfono"
        placeholder="Ej: 5551234567"
        fullWidth
        margin="normal"
        type="tel"
        required
      />

      <TextField
        label="Horario de carga"
        placeholder="Ej: 8:00 - 17:00"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Placas"
        placeholder="Ej: ABC123"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Modelo"
        placeholder="Ej: Toyota Hilux 2022"
        fullWidth
        margin="normal"
      />

      <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }} fullWidth>
        <FormLabel component="legend">Tipo de vehículo:</FormLabel>
        <RadioGroup value={vehicleType} onChange={handleVehicleTypeChange} name="vehicle-type">
          <FormControlLabel value="sedan" control={<Radio />} label="Sedan" />
          <FormControlLabel value="camioneta" control={<Radio />} label="Camioneta"/>
          <FormControlLabel value="otro" control={<Radio />} label="Otro" />
        </RadioGroup>

        {vehicleType === "otro" && (<TextField label="Especificar tipo" placeholder="¿Qué tipo de vehículo?" fullWidth margin="normal" 
        value={otherVehicleType} onChange={(e) => setOtherVehicleType(e.target.value)} />)}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
      >
        Guardar
      </Button>
    </Box>
  );
}