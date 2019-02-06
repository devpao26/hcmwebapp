import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Wrapper = styled.div`
  clear: both;
  margin: 0 0 15px;
  padding: 10px 20px 0;
  font-size: 12px;

  &:after {
    clear: both;
    content: '';
    display: table;
  }

  .export-btn {
    float: right;
    margin-top: 5px;
  }

  form {
    display: inline-block;
    vertical-align: middle;
    width: ${(props) => props.wrapWidth ? props.wrapWidth : '100%'};
    max-width: 100%;
    position: relative;

    input:not([type=checkbox]):not([type=radio]) {
      padding-right: 38px;
      /* width: calc(100% - 10px); */
    }

    .btn-search {
      outline: 0;
      border: 0;
      position: absolute;
      top: 4px;
      right: 0;
      padding: 2px 5px;
      cursor: pointer;
      font-size: 1.1em;
    }

    .btn-reset {
      outline: 0;
      border: 0;
      position: absolute;
      top: 5px;
      right: 20px;
      padding: 2px 5px;
      cursor: pointer;
      font-size: .95em;
    }
  }

  .filter-label {
    font-size: .8em;
    color: #2abb9c;
  }

  .filter-buttons {
    margin-left: 5px;

    button {
      font-size: .9em;
    }
  }

  ${media.tablet`
    padding: 0 15px;

    form {
      width: 100%;
      margin-bottom: 5px;

      input:not([type=checkbox]):not([type=radio]) {
        margin-right: 0;
        padding-right: 25px;
        width: 100%;
      }

      .btn-search {
        right: 0;
      }

      .btn-reset {
        right: 20px;
      }
    }

    .filter-buttons {
      display: block;
      width: 100%;
      text-align: center;
      margin-left: 0;

      button {
        font-size: .85em;
      }
    }
  `}
`;

export default Wrapper;
