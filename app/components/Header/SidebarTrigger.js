import styled from 'styled-components';

const Trigger = styled.button`
    outline: 0;
    border: 0;
    float: left;
    color: #fff;
    font-size: 1.5em;
    margin-top: -3px;
    cursor: pointer;

    @media screen and (min-width: 1024px) {
        display: none;
    }
`;

export default Trigger;
