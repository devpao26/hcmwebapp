import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const CalendarWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);
  font-size: 13px;

  ${media.tablet`
    max-height: 37px;
    transition: all 1s ease-in-out;
    overflow: hidden;

    &.toggle {
      max-height: none;
      overflow: auto;
      transition: all .5s ease-in-out;

      h2 .fa-caret-down {
        transform: rotate(0deg);
      }
    }
  `}
`;

export default CalendarWrapper;
