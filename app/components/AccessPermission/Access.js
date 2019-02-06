import styled from 'styled-components';
import { BorderColor, ActiveColor } from '../StyleUtils/Colors';
import { media } from '../StyleUtils';

const Access = styled.div`
  font-size: 12px;
  margin-bottom: 15px;

  h3 {
    display: block;
    width: 100%;
    text-align: left;
    text-transform: uppercase;
    position: relative;
    font-weight: 500;
    padding: 10px 30px 5px;
    margin: 0 0 10px;
    border-bottom: 1px solid ${BorderColor};

    span,
    .fa-cube,
    .fa-key {
      display: inline-block;
      vertical-align: middle;
    }

    span {
      max-width: 87%;
    }

    .fa-cube {
      font-size: 2.5em;
      margin-right: 10px;
    }
    
    .fa-key {
      color: ${ActiveColor};
      margin-left: 2px;
    }
  }

  .access-list {
    list-style: none;
    margin: 0 0 0;
    padding: 15px 0 5px;

    li {
      padding: 8px 20px;
      display: block;
      border-bottom: 1px solid ${BorderColor};

      .custom-checkbox,
      .item {
        display: inline-block;
        vertical-align: top;
      }

      .item {
        width: calc(100% - 25px);

        .name {
          display: block;
        }

        .custom-select {
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
          color: ${ActiveColor};

          .select-tag select {
            font-size: .9em;
          }
        }
      }

      .custom-checkbox {
        margin-right: 3px;
      }

      b {
        font-weight: 400;
        font-size: .75em;
        /* display: inline-block;
        vertical-align: middle; */
        margin-left: 2px;
        color: ${ActiveColor};
      }
    }
  }

  ${media.handheldLandscape`
    h3 {
      .fa-cube {
        font-size: 1.5em;
      }
    }
  `}
`;

export default Access;
