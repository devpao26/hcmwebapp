/**
 * Form styled components
 */

import styled from 'styled-components';

const RequestForm = styled.div`
    padding: 10px;
    
    label {
        color: rgba(12, 19, 29, 0.7);
        font-size: .8em;        
        margin: 5px 0px;
        display: block;
    }
    textarea {
        border: 1px solid rgb(211, 214, 219);
    }
    .border-highlight {
        border-bottom: 0.5px solid #d3d6db;
        padding-bottom: 5px;
    }
    .required-label {
        color: rgb(236, 95, 89);
    }
`;

export default RequestForm;
