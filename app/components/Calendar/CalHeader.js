import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const CalHeader = styled.div`
  display: flex;
  flex-director: column;
  line-height: 1;

  button {
    display: block;
    font-size: 1.2em;
    width: 45px;
    height: 40px;
    border: 1px solid ${BorderColor};
    border-radius: 0;
    cursor: pointer;
    outline: 0;

    &:hover {
      background-color: #e1e1e1;
    }
  }

  div {
    flex: 2 0 auto;
    text-align: center;
    font-size: 1.1em;
    border-top: 1px solid ${BorderColor};
    border-bottom: 1px solid ${BorderColor};
    line-height: 38px;
  }
`;

export default CalHeader;
