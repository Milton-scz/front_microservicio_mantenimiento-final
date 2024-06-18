import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';

const CrearMantenimiento = ({ open, onClose, onCreate }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [responsable, setResponsable] = useState('');
  const [costo, setCosto] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoMantenimiento = {
      nombre,
      descripcion,
      fecha_inicio: fechaInicio,
      responsable,
      costo: parseFloat(costo), // Convierte el costo a un número
      estado,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/activos', nuevoMantenimiento);
      console.log('Mantenimiento creado:', response.data);
      onCreate(); // Llama a la función para cargar activos y actualizar la lista
      onClose(); // Cierra el diálogo de creación de mantenimiento
      // Limpia los campos del formulario después de crear el mantenimiento
      setNombre('');
      setDescripcion('');
      setFechaInicio('');
      setResponsable('');
      setCosto('');
      setEstado('');
    } catch (error) {
      console.error('Error al crear mantenimiento:', error);
      // Manejo de errores - podrías mostrar un mensaje al usuario aquí
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Mantenimiento</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            margin="dense"
            id="descripcion"
            label="Descripción"
            type="text"
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <TextField
            margin="dense"
            id="fechaInicio"
            label="Fecha de Inicio"
            type="date"
            fullWidth
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <TextField
            margin="dense"
            id="responsable"
            label="Responsable"
            type="text"
            fullWidth
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
          />
          <TextField
            margin="dense"
            id="costo"
            label="Costo"
            type="number"
            fullWidth
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
          />
          <TextField
            margin="dense"
            id="estado"
            label="Estado"
            type="text"
            fullWidth
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CrearMantenimiento;
