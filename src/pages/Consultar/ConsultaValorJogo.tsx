import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  TextField,
  Button,
} from '@mui/material';

const ConsultaValorJogo: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const [valor, setValor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleBuscar = async () => {
    if (!codigo) return;

    setLoading(true);
    setErro(null);
    setValor(null);

    try {
      const url = `api/acmegames/aluguel/valorjogo/${codigo}`;
      const response = await axios.get<number>(url);
      setValor(response.data);
    } catch (error) {
      setErro('Erro ao buscar o valor do jogo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Consulta Valor do Jogo por Código
      </Typography>

      <Box display="flex" gap={2} mb={3} alignItems="center">
        <TextField
          label="Código do Jogo"
          variant="outlined"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          type="number"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuscar}
          disabled={!codigo || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
        </Button>
      </Box>

      {erro && (
        <Typography color="error" mb={2}>
          {erro}
        </Typography>
      )}

      {valor !== null && !loading && (
        <Typography variant="h6">
          Valor do Jogo: R$ {valor.toFixed(2)}
        </Typography>
      )}
    </Paper>
  );
};

export default ConsultaValorJogo;
