import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Left = styled.div`
  font-size: 12px;
  flex: 1;
  margin-right: 20px;
  margin-bottom: 15px;
  background-color: #fff;

  &.toggle h2 {
    .fa-caret-down {
      transform: rotate(0);
    }
  }

  ${media.tablet`
    margin-right: 0;
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

export default Left;
