import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface Jogo {
  codigo: number;
  nome: string;
  valorBase: number;
  tipoEletronico?: string;
  plataforma?: string;
  tipoMesa?: string;
  numeroPecas?: number;
}

const ConsultaJogos: React.FC = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchJogos = async () => {
    setLoading(true);
    setErro(null);

    try {
      const response = await axios.get<Jogo[]>('api/acmegames/cadastro/listajogos');
      setJogos(response.data);
    } catch (error) {
      setErro('Erro ao buscar os jogos cadastrados.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJogos();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Lista de Jogos Cadastrados
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        {loading && <CircularProgress />}
      </Box>

      {erro && (
        <Typography variant="body2" color="error" mb={2}>
          {erro}
        </Typography>
      )}

      {!loading && !erro && jogos.length === 0 && (
        <Typography variant="body1">Nenhum jogo cadastrado.</Typography>
      )}

      {jogos.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Código</strong></TableCell>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Gênero</strong></TableCell>
                <TableCell><strong>Plataforma</strong></TableCell>
                <TableCell><strong>Valor Base</strong></TableCell>
                <TableCell><strong>Nº de Peças</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jogos.map((jogo) => (
                <TableRow key={jogo.codigo}>
                  <TableCell>{jogo.codigo}</TableCell>
                  <TableCell>{jogo.nome}</TableCell>
                  <TableCell>{jogo.tipoEletronico || jogo.tipoMesa || '-'}</TableCell>
                  <TableCell>{jogo.plataforma || '-'}</TableCell>
                  <TableCell>R$ {jogo.valorBase.toFixed(2)}</TableCell>
                  <TableCell>{jogo.numeroPecas ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ConsultaJogos;
