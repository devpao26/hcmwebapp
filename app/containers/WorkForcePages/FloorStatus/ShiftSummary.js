import styled from 'styled-components';

const ShiftSummary = styled.ul`
  list-style: none;
  margin: 0 0 0;
  padding: 0 0 0;
  max-height: 320px;
  height: 100%;
  overflow-y: auto;
  font-size: 13px;

  .loading {
    margin-bottom: 15px;
  }

  li {
    background-color: #fbfcfe;
    border-bottom: 1px solid #f4f5fb;

    &.no-data {
      text-align: center;
      padding: 10px;
    }

    div {
      display: inline-block;
      vertical-align: top;
      width: 50%;
      padding: 15px 8px;
      border-left: 1px solid #f4f5fb;

      &.appurl-list {
        width: 100%;
        border-left: 0;

        p {
          font-size: 1em;
          word-wrap: break-word;

          small {
            display: block;
            color: #838791;
          }
        }
      }

      p {
        margin: 0 0 0;
        font-size: 1.1em;
        text-align: center;

        span {
          display: block;
          font-size: .75em;
          color: #838791;
        }
      }

      .status,
      &:first-child p {
        display: inline-block;
        vertical-align: middle;
        text-align: left;
      }

      &:first-child p {
        width: calc(100% - 20px);
      }

      .status {
        margin-right: 10px;
      }
    }
  }
`;

export default ShiftSummary;