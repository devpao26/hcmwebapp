import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Menu = styled.ul`
  list-style: none;
  margin: 0 0 0;
  padding: 5px 0 0;
  float: right;
  width: calc(100% - 140px);
  text-align: right;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  
  li {
    display: inline-block;
    margin-left: 30px;

    a {
      color: #fff;
      text-decoration: none;
      position: relative;
      display: inline-block;

      &:hover {
        color: #0bd38a;
      }

      .num {
        position: absolute;
        top: -5px;
        left: 100%;
        font-size: .9em;
        color: #0bd38a;
      }
    }
    .cursor-li {
      cursor: pointer;
      &:hover {
        opacity: .6;
      }
    }
    .dead-li {
      opacity: .3;
    }

    form {
      position: relative;

      input {
        border: 0;
        border-bottom: 1px solid #fff;
        outline: 0;
        padding-left: 20px;
        width: 140px;

        &:disabled {
          opacity: .3;
        }
      }

      button {
        position: absolute;
        top: 1px;
        left: 3px;
        padding: 0 0;
        outline: 0;

        &:disabled {
          opacity: .3;
        }
      }
    }
  }

  ${media.tablet`
    width: calc(100% - 175px);

    li {
      display: none;
    }

    li:last-child {
      display: inline-block;
    }
  `}
`;

export default Menu;
