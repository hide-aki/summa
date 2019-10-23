import { injectGlobal } from 'styled-components';
import { Open } from './leads-assignment-styles';

injectGlobal `

    /***** REACT TABLE *****/
    .ReactTable .rt-noData{
        padding:0px;
    }
    /***** FIN REACT TABLE *****/

    /***** TABLA ASIGNACION DE LEADS ****/
    .remove-header .rt-thead{
        display: none;
    }
    /***** FIN TABLA ASIGNACION DE LEADS ****/
`;
