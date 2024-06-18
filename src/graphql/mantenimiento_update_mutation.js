import { gql } from "@apollo/client";

const MANTENIMIENTO_UPDATE_MUTATION = gql`
    mutation UpdateMantenimiento(
        $id: ID!
        $titulo: String!
        $descripcion: String!
        $fechaInicio: String!
        $responsable: String!
        $costo: Float!
        $estado: String!
    ) {
        updateMantenimiento(
            id: $id
            titulo: $titulo
            descripcion: $descripcion
            fechaInicio: $fechaInicio
            responsable: $responsable
            costo: $costo
            estado: $estado
        ) {
            id
            titulo
            descripcion
            fechaInicio
            responsable
            costo
            estado
        }
    }
`;

export default MANTENIMIENTO_UPDATE_MUTATION;
