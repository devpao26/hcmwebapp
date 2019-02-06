import styled from 'styled-components';

const Menu = styled.div`
  border-bottom: ${(props) => props.last ? '0' : '1px solid #313e4f'};
  position: relative;
  z-index: 2;

  h2 {
    font-weight: 400;
    font-size: .8em;
    color: #627590;
    margin: 0 0 10px;
    padding: 15px 0 5px 10px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;

    .svg-inline--fa {
      position: absolute;
      right: 7px;
      top: 50%;
      z-index: 2;
      font-size: 1em;
      transform: rotate(-90deg);
      transition: transform .2s ease-in-out;
    }
  }

  nav {
    max-height: 0px;
    overflow: hidden;
    transition: max-height .3s ease-in-out;
  }

  &.active {
    h2 .svg-inline--fa {
      transform: rotate(0deg);
    }

    /* nav {
      max-height: 600px;
      transition: max-height .3s ease-in-out;
      overflow: visible;
    } */
  }

  a {
    display: block;
    padding: 7px 11px;
    color: #abb6c7;
    text-decoration: none;
    border-left: 2px solid transparent;
    font-size: .85em;

    .svg-inline--fa {
      font-size: 1.1em;
      margin-right: 2px;
      text-align: center;
      min-width: 16px;
    }

    b {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 25px);
      font-weight: 400;
    }

    &:hover,
    &.active {
      border-left-color: #0bd38a;
      background-color: #2b3131;
    }

    span {
      float: right;
      width: 15px;
      color: #0bd38a;
      font-size: .9em;
      margin-top: -15px;
    }

    &:after {
      clear: both;
      content: '';
      display: table;
    }
  }

  .temp-link {
    display: block;
    padding: 7px 11px;
    color: #abb6c7;
    text-decoration: none;
    border-left: 2px solid transparent;
    font-size: .85em;
    opacity: .3;

    .svg-inline--fa {
      font-size: 1.1em;
      margin-right: 2px;
      text-align: center;
      min-width: 16px;
    }

    b {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 25px);
      font-weight: 400;
    }
  }
`;

export default Menu;
