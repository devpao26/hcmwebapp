import styled from 'styled-components';

const CalendarWrapper = styled.div`
  position: relative;
  right: 0;
  top: 100%;
  background-color: #fff;
  width: 300px;
  font-size: 11px;
  z-index: 10;

  h2 {
    padding: 5px 10px;
  }

  .date {
    top: 3px;
    right: 3px;
    font-size: .7em;
  }

  .day {
    border: 1px solid #fcfbfc;
    min-height: 4vh;
  }

  button {
    width: 35px;
    height: 30px;
  }

  .monthlabel {
    line-height: 28px;
  }
`;

export default CalendarWrapper;