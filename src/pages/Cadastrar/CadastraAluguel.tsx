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

const CadastraAluguel: React.FC = () => {
  const [jogoId, setJogoId] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState<boolean | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleCadastro = async () => {
    setLoading(true);
    setErro(null);
    setSucesso(null);

    // Validação simples para evitar envio com campos vazios
    if (!jogoId || !clienteId || !dataInicial || !periodo) {
      setErro('Preencha todos os campos corretamente.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<boolean>(
        'api/acmegames/cadastro/cadaluguel',
        {
          jogo_id: Number(jogoId),
          cliente_id: Number(clienteId),
          dataInicial,
          periodo: Number(periodo),
        }
      );
      setSucesso(response.data);
    } catch (error) {
      setErro('Erro ao cadastrar aluguel. Verifique os dados e tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Aluguel
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="ID do Jogo"
          variant="outlined"
          type="number"
          value={jogoId}
          onChange={(e) => setJogoId(e.target.value)}
          fullWidth
        />

        <TextField
          label="ID do Cliente"
          variant="outlined"
          type="number"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          fullWidth
        />

        <TextField
          label="Data Inicial"
          variant="outlined"
          type="date"
          value={dataInicial}
          onChange={(e) => setDataInicial(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="Período (dias)"
          variant="outlined"
          type="number"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCadastro}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
        </Button>

        {sucesso !== null && (
          <Typography variant="body1" color={sucesso ? 'green' : 'red'}>
            {sucesso ? 'Aluguel cadastrado com sucesso' : 'Falha no cadastro'}
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

export default CadastraAluguel;
