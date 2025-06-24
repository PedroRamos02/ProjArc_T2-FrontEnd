import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';

const ValidaCliente: React.FC = () => {
  const [numeroCliente, setNumeroCliente] = useState('');
  const [resultado, setResultado] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleValidarCliente = async () => {
    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const response = await axios.post<boolean>(
        'api/acmegames/validacliente',
        Number(numeroCliente), // Envia apenas o número
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setResultado(response.data);
    } catch (error) {
      setErro('Erro ao validar o cliente. Verifique o número e tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Validação de Cliente
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Número do Cliente"
          variant="outlined"
          value={numeroCliente}
          onChange={(e) => setNumeroCliente(e.target.value)}
          type="number"
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleValidarCliente}
          disabled={loading || !numeroCliente}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Validar Cliente'}
        </Button>

        {resultado !== null && (
          <Typography variant="body1" color={resultado ? 'green' : 'red'}>
            {resultado ? 'Cliente Válido' : 'Cliente Inválido'}
          </Typography>
        )}

        {erro && (
          <Typography variant="body2" color="error">
            {erro}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ValidaCliente;
