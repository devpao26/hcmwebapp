import styled from 'styled-components';
import { BorderActiveColor, BorderHoverColor, RedColor } from 'components/StyleUtils/Colors';

const Wrapper = styled.div`
  font-size: 13px;
  min-height: 150px;

  .message {
    font-size: 1.1em;
    text-align: center;
  }

  .details {
    font-size: 12px;
    margin-bottom: 20px;

    h3 {
      margin: 0 0 3px;
      font-size: 1.2em;
      font-weight: 500;
    }

    p {
      margin: 0 0 0;
    }
  }

  table {
    /* table-layout: fixed; */
    width: 100%;
    font-size: .9em;

    th {
      font-weight: 400;
      font-size: .8em;

      &:first-child {
        padding-left: 23px;
        min-width: 25%;
      }
    }

    td {
      background-color: #fbfcfe;
      padding: 12px 5px;
      border-bottom: 2px solid #fff;

      .status,
      p {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0 0;
      }
      
      .status {
        margin-right: 10px;
      }
      p {
        width: calc(100% - 25px);
      }

      .template-link {
        border-bottom: 1px solid ${BorderActiveColor};
        cursor: pointer;

        &:hover {
          border-bottom-color: ${BorderHoverColor};
        }
      }

      button {
        color: ${RedColor};
        cursor: pointer;
        font-size: 1.25em;
      }
    }
  }
`;

export default Wrapper;
