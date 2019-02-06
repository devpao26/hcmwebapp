import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Content = styled.div`
  margin-bottom: ${(props) => props.noMargin ? '0px' : '10px'};
  background-color: ${(props) => props.bgColor ? props.bgColor : 'none'};
  ${(props) => props.height ? 'height: 100%' : ''};

  &.shift-summary {
    max-height: 400px;
    overflow-y: auto;
    background-color: #fff;
  }

  .search-filter {
    padding: 10px 10px 0;
    margin-bottom: 10px;

    form {
      display: block;
      width: 100%;

      input {
        width: 100% !important;
      }
    }
  }

  select {
    max-width: 100%;
  }

  p.message {
    text-align: center;
    padding-bottom: 10px;
  }

  ${media.tablet`
    max-height: ${(props) => props.noMaxHeight ? 'none' : '37px'};
    transition: all 1s ease-in-out;
    overflow: hidden;

    &.shift-summary {
      max-height: ${(props) => props.noMaxHeight ? 'none' : '37px'};
      transition: all 1s ease-in-out;
      overflow: hidden;
    }

    &.payroll-review {
      display: none;
    }

    &.toggle,
    &.shift-summary.toggle {
      max-height: none;
      overflow: auto;
      transition: all .5s ease-in-out;

      h2 .fa-caret-down {
        transform: rotate(0deg);
      }
    }
  `}
`;

export default Content;
