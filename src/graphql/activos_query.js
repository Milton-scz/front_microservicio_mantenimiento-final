import { gql } from "@apollo/client";

const ACTIVOS_QUERY = gql`
query Mesas {
    mesas {
        id
        nro
        capacidad
        disponible
    }
}
`;

export default ACTIVOS_QUERY;
