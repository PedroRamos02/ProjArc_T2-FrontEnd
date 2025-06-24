import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  CircularProgress,
} from '@mui/material';

const CadastraCliente: React.FC = () => {
  const [tipo, setTipo] = useState('individual');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState<boolean | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleCadastro = async () => {
    setLoading(true);
    setErro(null);
    setSucesso(null);

    try {
      const response = await axios.post<boolean>(
        'api/acmegames/cadastro/cadcliente',
        {
          tipo,
          nome,
          cpf,
          endereco,
          telefone,
        }
      );
      setSucesso(response.data);
    } catch (error) {
      setErro('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Cliente
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          select
          label="Tipo de Cliente"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          fullWidth
        >
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="corporativo">Corporativo</MenuItem>
        </TextField>

        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />

        <TextField
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          fullWidth
        />

        <TextField
          label="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          fullWidth
        />

        <TextField
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
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
            {sucesso ? ' Cliente cadastrado com sucesso' : 'Falha no cadastro'}
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

export default CadastraCliente;
