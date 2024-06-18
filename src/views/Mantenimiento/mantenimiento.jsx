import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EditarMantenimiento from './editar';
import CrearMantenimiento from './crear';

const Activos = () => {
  const [activos, setActivos] = useState([]);
  const [selectedActivo, setSelectedActivo] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCrearMantenimientoOpen, setCrearMantenimientoOpen] = useState(false);
  const [error, setError] = useState(null);

  // Definimos cargarActivos fuera del useEffect para que esté disponible en todo el componente
  const cargarActivos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/activos');
      setActivos(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    cargarActivos();
  }, []);

  const handleCrearMantenimientoOpen = () => {
    setCrearMantenimientoOpen(true);
  };

  const handleCrearMantenimientoClose = () => {
    setCrearMantenimientoOpen(false);
  };

  const handleEditClick = (activo) => {
    setSelectedActivo(activo);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedActivo(null);
  };

  const handleEditSave = (updatedActivo) => {
    setActivos(activos.map(activo => (activo.id === updatedActivo.id ? updatedActivo : activo)));
  };

  const handleMantenimientoCreated = () => {
    cargarActivos(); // Llamamos a cargarActivos para actualizar la lista después de crear un mantenimiento
  };

  const printTable = () => {
    const printContents = document.getElementById('activos-table').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (error) {
    return <p>Error al cargar los activos: {error.message}</p>;
  }

  return (
    <div className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Mantenimientos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCrearMantenimientoOpen}
        style={{ marginBottom: '1rem' }}
      >
        Crear Mantenimiento
      </Button>
      <TableContainer component={Paper} id="activos-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activos.map((activo) => (
              <TableRow key={activo.id}>
                <TableCell>{activo.id}</TableCell>
                <TableCell>{activo.nombre}</TableCell>
                <TableCell>{activo.descripcion}</TableCell>
                <TableCell>{activo.fecha_inicio}</TableCell>
                <TableCell>{activo.responsable}</TableCell>
                <TableCell>{activo.costo}</TableCell>
                <TableCell>{activo.estado}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(activo)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={printTable}
        >
          Imprimir
        </Button>
      </TableContainer>
      {selectedActivo && (
        <EditarMantenimiento
          activo={selectedActivo}
          open={isEditOpen}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      )}
      <CrearMantenimiento
        open={isCrearMantenimientoOpen}
        onClose={handleCrearMantenimientoClose}
        onCreate={handleMantenimientoCreated}
      />
    </div>
  );
};

export default Activos;
