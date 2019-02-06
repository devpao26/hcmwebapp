import styled from 'styled-components';
import { BorderActiveColor, ActiveColor } from 'components/StyleUtils/Colors';

const Wrapper = styled.div`
  font-size: 12px;
  padding: 10px;

  h3 {
    margin: 0 0 0;
  }

  .cols {
    display: inline-block;
    vertical-align: top;

    &.current {
      width: 40%;
    }

    &.arrow {
      width: 10%;
      padding: 50px 10px 0;
      text-align: center;

      .fa-arrow-right {
        font-size: 3em;
      }
    }

    &.transfer {
      width: 50%;
    }
  }

  .box {
    background-color: #fff;
    box-shadow: 0px 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px 5px 15px;

    .current-placement {
      margin: 0 0 10px;
      font-size: .9em;
      color: #838690;
    }

    .name {
      margin: 0 0 -1px;
      border: 1px dashed ${BorderActiveColor};
      font-weight: 600;
      font-size: 1.125em;
      padding: 3px 5px;
    }
  }

  .current {
    .action {
      padding: 25px 5px 0;

      .btn {
        display: block;
        margin: 0 auto 10px;
        width: 60%;
      }
    }
  }

  .transfer {
    .box {
      padding: 10px 10px 15px;
    }

    .search-filter {
      margin-bottom: 10px
    }

    .breadcrumbs {
      padding: 0 5px 10px;
    }

    .transfer-list {
      dl {
        padding-top: 0;
        padding-bottom: 0;

        h4 {
          padding: 12px 45px 12px 5px;
          width: calc(100% - 30px);
        }

        .goto {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          font-size: 2em;
          padding: 0 5px 0 10px;
          cursor: pointer;

          &:hover {
            color: ${ActiveColor};
          }
        }

        .fa-check-circle {
          right: 25px;
        }
      }
    }

    .pagination {
      padding-bottom: 0;
    }
  }
`;

export default Wrapper;
