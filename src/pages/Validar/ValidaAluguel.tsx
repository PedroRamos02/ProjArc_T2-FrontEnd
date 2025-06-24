import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import axios from 'axios';

const ValidaAluguel: React.FC = () => {
  const [identificador, setIdentificador] = useState('');
  const [resultado, setResultado] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleValidar = async () => {
    if (!identificador) return;

    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const response = await axios.post<boolean>(
        `api/acmegames/validaaluguel`,
        Number(identificador), 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setResultado(response.data);
    } catch (error: any) {
      setErro('Erro ao validar o aluguel');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Validação de Aluguel
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Identificador do Aluguel"
          variant="outlined"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
          type="number"
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleValidar}
          disabled={loading || !identificador}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Validar'}
        </Button>

        {resultado !== null && (
          <Typography variant="body1" color={resultado ? 'green' : 'red'}>
            {resultado ? 'Aluguel Válido' : 'Aluguel Inválido'}
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

export default ValidaAluguel;
