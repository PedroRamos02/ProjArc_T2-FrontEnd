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

interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  cpf?: string;
  cnpj?: string;
  nomeFantasia?: string;
}

const ConsultaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchClientes = async () => {
    setLoading(true);
    setErro(null);

    try {
      const response = await axios.get<Cliente[]>('api/acmegames/cadastro/listaclientes');
      setClientes(response.data);
    } catch (error) {
      setErro('Erro ao buscar os clientes cadastrados.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Lista de Clientes Cadastrados
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        {loading && <CircularProgress />}
      </Box>

      {erro && (
        <Typography variant="body2" color="error" mb={2}>
          {erro}
        </Typography>
      )}

      {!loading && !erro && clientes.length === 0 && (
        <Typography variant="body1">Nenhum cliente cadastrado.</Typography>
      )}

      {clientes.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Nome / Nome Fantasia</strong></TableCell>
                <TableCell><strong>CPF / CNPJ</strong></TableCell>
                <TableCell><strong>Endereço</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{cliente.nomeFantasia || cliente.nome}</TableCell>
                  <TableCell>{cliente.cpf || cliente.cnpj || '-'}</TableCell>
                  <TableCell>{cliente.endereco}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ConsultaClientes;
