import React from 'react';
import { 
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { 
  AccountCircle as AccountCircleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Lock as LockIcon 
} from '@mui/icons-material';

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl component="form" className="login-form" sx={{ width: '100%' }}>
      <FormGroup>
        <TextField
          label="Usuario"
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <FormControlLabel
          control={<Checkbox />}
          label="Recordar mis datos"
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Iniciar sesión
        </Button>
      </FormGroup>
    </FormControl>
  );
}