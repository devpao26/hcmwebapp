import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const List = styled.div`
  // grid-area: list;

  .emp-list {
    list-style: none;
    margin: 0 0 10px;
    padding: 0 0 0;

    li {
      padding: 13px 10px;
      border-bottom: 1px solid #f9f9fc;
      position: relative;

      span {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
      }

      .emp-name {
        text-transform: capitalize;
      }

      &:hover,
      &.active {
        background-color: #f1f2f3;
      }

      .option-menu {
        display: none;
        vertical-align: middle;
        position: relative;
        z-index: 2;
      }
    }
  }

  ${media.tablet`
    ul {
      li {
        padding-right: 0;

        span {
          width: calc(100% - 20px);
        }

        .option-menu {
          display: inline-block;
        }
      }
    }
  `}
`;

export default List;
