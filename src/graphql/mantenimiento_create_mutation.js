import { gql } from "@apollo/client";

const MANTENIMIENTO_CREATE_MUTATION = gql`
    mutation DeleteMesa($id: ID!){
        deleteMesa(id: $id)
    }
`;

export default MANTENIMIENTO_CREATE_MUTATION;
