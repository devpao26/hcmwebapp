import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Right = styled.div`
  min-width: 320px;
  width: 30%;
  font-size: 12px;
  margin-bottom: 15px;
  background-color: #fff;

  &.toggle h2 {
    .fa-caret-down {
      transform: rotate(0);
    }
  }

  ${media.tablet`
    min-width: auto;
    width: 100%;
    max-height: 37px;
    transition: all 1s ease-in-out;
    overflow: hidden;

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

export default Right;
