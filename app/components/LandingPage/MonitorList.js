import styled from 'styled-components';

const MonitorList = styled.ul`
  list-style: none;
  margin: 0 0 0;
  padding: 15px;

  li {
    display: block;
    margin-bottom: 15px;

    p {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0 0;
      width: 64%;
      line-height: 1.2;

      span:last-child {
        font-size: .8em;
      }
    }

    p:first-child {
      padding-left: 30px;
    }

    p:last-child {
      width: 30%;
    }

    .name {
      display: block;
    }

    .circle {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      background-color: #58bfab;
    }

    small {
      font-size: .8em;
      color: #b9b8b8;
    }
  }
`;

export default MonitorList;