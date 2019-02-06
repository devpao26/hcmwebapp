import styled from 'styled-components';

const MarkAs = styled.span`
  // border: 1px solid #f57c27;
  .svg-inline--fa {
    display: inline-block;
    font-size: 1.7em;
    text-align: center;
    cursor: pointer;
  }

  .fa-square {
    color: #f57c27;
  }

  .fa-check-square {
    color: #2abb9c;
    cursor: default;
  }

  .fa-window-close {
    color: #df6236;
    font-size: 1.5em;
    cursor: default;
  }

  .disabled {
    cursor: default;
    color: #838690;
  }
`;

export default MarkAs;
