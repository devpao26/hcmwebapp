import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Columns = styled.div`
  border: ${(props) => props.noBorder ? '' : '1px dashed #a1a3a3'};
  padding: 3px;
  width: 24%;
  margin: ${(props) => props.head ? '0 auto 20px' : '0 .5% 30px'};
  position: relative;

  .expander {
    position: absolute;
    top: 22px;
    right: 0;
    color: #9ea3b4;
    font-size: 1.5em;
    outline: 0;
    padding: 1px 4px;
    display: none;
  }

  ${media.tablet`
    width: 100%;
    padding: 3px 20px;
    max-height: 68px;
    transition: all 1s ease-in-out;
    overflow: ${(props) => props.head ? 'visible' : 'hidden'};

    .option-menu {
      display: ${(props) => props.head ? '' : 'none'};
    }

    &.toggle {
      max-height: none;
      overflow: visible;

      .option-menu {
        display: block;
      }
    }

    .expander {
      display: block;
    }
  `}
`;

export default Columns;
