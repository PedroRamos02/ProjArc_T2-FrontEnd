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

const ValidaJogo: React.FC = () => {
  const [codigoJogo, setCodigoJogo] = useState('');
  const [resultado, setResultado] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleValidar = async () => {
    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const response = await axios.post<boolean>(
        'api/acmegames/validajogo',
        Number(codigoJogo),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setResultado(response.data);
    } catch (error) {
      setErro('Erro ao validar o jogo. Verifique o código e tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Validação de Jogo
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Código do Jogo"
          variant="outlined"
          value={codigoJogo}
          onChange={(e) => setCodigoJogo(e.target.value)}
          type="number"
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleValidar}
          disabled={loading || !codigoJogo}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Validar Jogo'}
        </Button>

        {resultado !== null && (
          <Typography variant="body1" color={resultado ? 'green' : 'red'}>
            {resultado ? 'Jogo Válido' : 'Jogo Inválido'}
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

export default ValidaJogo;
