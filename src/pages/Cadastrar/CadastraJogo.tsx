import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const CadastraJogo: React.FC = () => {
  const [tipo, setTipo] = useState<'eletronico' | 'mesa'>('eletronico');
  const [nome, setNome] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [tipoEletronico, setTipoEletronico] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [tipoMesa, setTipoMesa] = useState('');
  const [numeroPecas, setNumeroPecas] = useState('');

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState<boolean | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleCadastrar = async () => {
    setLoading(true);
    setErro(null);
    setSucesso(null);

    try {
      const payload =
        tipo === 'eletronico'
          ? {
              tipo,
              nome,
              valorBase: parseFloat(valorBase),
              tipoEletronico,
              plataforma,
            }
          : {
              tipo,
              nome,
              valorBase: parseFloat(valorBase),
              tipoMesa,
              numeroPecas: parseInt(numeroPecas),
            };

      const response = await axios.post<boolean>(
        'api/acmegames/cadastro/cadjogo',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setSucesso(response.data);
    } catch (error) {
      setErro('Erro ao cadastrar o jogo. Verifique os dados e tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Jogo
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          select
          label="Tipo de Jogo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as 'eletronico' | 'mesa')}
          fullWidth
        >
          <MenuItem value="eletronico">Eletrônico</MenuItem>
          <MenuItem value="mesa">Mesa</MenuItem>
        </TextField>

        <TextField
          label="Nome do Jogo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />

        <TextField
          label="Valor Base (R$)"
          type="number"
          value={valorBase}
          onChange={(e) => setValorBase(e.target.value)}
          fullWidth
        />

        {tipo === 'eletronico' ? (
          <>
            <TextField
              select
              label="Tipo Eletrônico"
              value={tipoEletronico}
              onChange={(e) => setTipoEletronico(e.target.value)}
              fullWidth
            >
              <MenuItem value="SIMULACAO">Simulação</MenuItem>
              <MenuItem value="AVENTURA">Aventura</MenuItem>
              <MenuItem value="ESTRATEGIA">Estratégia</MenuItem>
            </TextField>
            <TextField
              label="Plataforma"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              fullWidth
            />
          </>
        ) : (
          <>
            <TextField
              label="Tipo de Mesa"
              value={tipoMesa}
              onChange={(e) => setTipoMesa(e.target.value)}
              fullWidth
            />
            <TextField
              label="Número de Peças"
              type="number"
              value={numeroPecas}
              onChange={(e) => setNumeroPecas(e.target.value)}
              fullWidth
            />
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCadastrar}
          disabled={loading || !nome || !valorBase}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar Jogo'}
        </Button>

        {sucesso !== null && (
          <Typography variant="body1" color={sucesso ? 'green' : 'red'}>
            {sucesso ? 'Jogo cadastrado com sucesso!' : 'Falha ao cadastrar jogo.'}
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

export default CadastraJogo;
