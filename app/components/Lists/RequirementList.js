/*
 * Requirement List
 *
 */
import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const List = styled.div`
  margin: 0 0 0;
  padding: 0 0 0;
  font-size: 12px;
  max-height: 87vh;
  overflow-y: auto;

  dl {
    display: table;
    width: 100%;
    background-color: #fbfcfe;
    box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);
    margin-bottom: 20px;
    padding: 5px 10px;

    dd {
      display: table-cell;
      vertical-align: middle;
      padding: 7px 5px;

      p {
        margin: 0 0 0;
      }

      a,
      .view-file {
        color: #2abb9c;
        text-decoration: none;
        cursor: pointer;
        padding: 8px 0 0;

        &.gray {
          color: #838690;
        }
      }
    }

    dd:first-child {
      width: 30px;
      text-align: center;
    }

    dd:nth-child(2) {
      width: 33%;
    }

    dd.col-3 {
      width: 55%;

      p,
      .upload-container {
        float: left;

        &.file-count {
          float: right;
        }
      }
    }

    dd:nth-child(4) {
      width: 17%;
      text-align: center;
    }

    .files {
      background-color: #2b3131;
      padding: 10px;
      text-align: center;
      display: inline-block;
      color: #fff;
      min-width: 100px;
      line-height: 1;
    }
  }

  .total-completion {
    margin: 0 0 0;
    padding: 0 15px 0;

    span {
      color: #da3832;

      &.complete {
        color: #2abb9c;
      }
    }
  }

  .btn {
    padding: 20px 5%;
    display: block;
  }

  .loading {
    padding: 3px 0 15px;
  }

  ${media.handheld `
    font-size: 12px;

    dl {
      dd.col-3 {
        text-align: center;
        p {
          float: none;

          &.file-count {
            float: none;
          }
        }
      }
    }
  `}
`;

export default List;
