import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import MANTENIMIENTO_UPDATE_MUTATION from '../../graphql/mantenimiento_update_mutation';

const EditarMantenimiento = ({ activo, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: activo.id,
    idActivo: activo.idActivo || '',
    titulo: activo.titulo || '',
    descripcion: activo.descripcion || '',
    fechaInicio: activo.fechaInicio || '',
    responsable: activo.responsable || '',
    costo: activo.costo.toString() || '',
    estado: activo.estado || ''
  });

  const [updateMantenimiento] = useMutation(MANTENIMIENTO_UPDATE_MUTATION);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { id, idActivo, titulo, descripcion, fechaInicio, responsable, costo, estado } = formData;
      const { data } = await updateMantenimiento({
        variables: {
          id,
          idActivo,
          titulo,
          descripcion,
          fechaInicio,
          responsable,
          costo: parseFloat(costo),
          estado
        }
      });
      onSave(data.actualizadoMantenimiento); // Llama a la función onSave con los datos actualizados
      onClose();
    } catch (error) {
      console.error('Error al actualizar el mantenimiento:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Mantenimiento</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="titulo"
          label="Titulo"
          type="text"
          fullWidth
          variant="standard"
          value={formData.titulo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="descripcion"
          label="Descripción"
          type="text"
          fullWidth
          variant="standard"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="fechaInicio"
          label="Fecha de Inicio"
          type="date"
          fullWidth
          variant="standard"
          value={formData.fechaInicio}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="responsable"
          label="Responsable"
          type="text"
          fullWidth
          variant="standard"
          value={formData.responsable}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="costo"
          label="Costo"
          type="number"
          fullWidth
          variant="standard"
          value={formData.costo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="estado"
          label="Estado"
          type="text"
          fullWidth
          variant="standard"
          value={formData.estado}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarMantenimiento;
