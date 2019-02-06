import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Section = styled.article`
  background: #fff;
  box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  position: relative;
  margin-bottom: 15px;
  font-size: 12px;
  ${(props) => props.half ? 'flex-basis: 49%' : ''};

  .loading-cont {
    position: relative !important;
    padding: 15px 0;
  }

  .see-more {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: .9em;
    color: #0bd38a;
    text-decoration: none;
    cursor: pointer;
  }

  &:after {
    clear: both;
    content: '';
    display: table;
  }

  &.shift-cont {
    li {
      background-color: transparent;
    }
    li.no-data {
      padding-top: 20px;
      border-bottom: 0;
    }
  }

  &.leave-cont {
    .cell:first-child {
      width: auto;
    }

    .cell .emp-name {
      font-size: 1em;
    }
  }

  ${media.tablet `
    max-height: 37px;
    transition: all 1s ease-in-out;
    overflow: hidden;

    &.expand {
      max-height: none;
      overflow: visible;
    }

    &.toggle {
      max-height: 999em;
      overflow: auto;
      transition: all .5s ease-in-out;

      .see-more {
        display: block;
      }
    }
  `}
`;

export default Section;
