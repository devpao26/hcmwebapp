import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const WhiteBox = styled.div`
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);
  border-radius: 2px;
  margin-bottom: 15px;

  h2 {
    margin-bottom: 0;

    .fa-caret-down {
      transform: rotate(-90deg);
      transition: transform .2s ease-in-out;
    }
  }

  &.toggle h2 {
    .fa-caret-down {
      transform: rotate(0);
    }
  }

  .list {
    margin-top: 10px;
    padding: 0 10px 1px;
    max-height: calc(100% - 50px);
    height: 100%;
    overflow-y: auto;
  }

  .pagination {
    padding: 10px;
  }

  ${ media.tablet `
    max-height: 37px;
    transition: all 1s ease-in-out;
    overflow: hidden;

    &.expand {
      max-height: none;
      overflow: visible;
    }

    &.toggle {
      max-height: none;
      overflow: auto;
      transition: all .5s ease-in-out;

      .see-more {
        display: block;
      }
    }
  `}
`;

export default WhiteBox;