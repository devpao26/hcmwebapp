import styled from 'styled-components';

const Days = styled.div`
  flex: 1;
  position: relative;
  border: 1px solid #e1e1e1;
  margin-left: -1px;
  margin-bottom: -1px;
  cursor: pointer;
  min-height: 7vh;

  transition: background-color 150ms ease-in;

  &:hover {
    background-color: #f8f8f8;
  }

  .date {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: .9em;
    color: #9b9c9c;
    line-height: 1;
  }

  &.diff-month {
    .date {
      color: #d2d2d2;
    }
  }

  &.selected {
    background-color: #58bfab;

    .date {
      color: #fff;
    }
  }
`;

export default Days;
