import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const SelectWrap = styled.div`
  display: ${(props) => props.display ? props.display : 'block'};
  width: ${(props) => props.width ? props.width : '100%'};
  padding: ${(props) => props.padding ? props.padding : '0'};
  font-size: 12px;

  label {
    display: block;
    font-size: .75em;
    color: #7a7f85;
    margin-bottom: 3px;
  }

  .select-cont {
    display: block;
    width: 100%;
    position: relative;

    .fa-caret-down {
      position: absolute;
      z-index: 1;
      right: 3px;
      top: 4px;
    }

    select {
      padding: 2px 0;
      border: 0;
      outline: 0;
      border-bottom: 1px solid ${BorderColor};
      appearance: none;
      padding-right: 20px;
      border-radius: 0;
      display: block;
      width: 100%;
      position: relative;
      z-index: 2;
    }
  }
`;

export default SelectWrap;
