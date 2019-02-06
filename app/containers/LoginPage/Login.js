import styled from 'styled-components';

const LoginDiv = styled.div`
  grid-area: sidebar;
  display: table;
  background-color: #fff;
  width: 450px;
  position: relative;

  & > div {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 100vh;
    text-align: center;
    padding: 100px;
  }

  .loading-cont {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.7);
    z-index: 2;
  }

  p {
    margin: 0 0 40px;
    text-align: left;
  }

  .error-msg {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: .8em;
    color: #ff0000;
    text-align: left;
    display: block;
    font-style: italic;
  }

  label {
    display: block;
    margin: 0 0 15px;
    font-size: .9em;
    position: relative;

    input {
      padding-left: 30px !important;
    }

    .svg-inline--fa {
      position: absolute;
      top: 4px;
      left: 3px;
      font-size: 18px;
      color: #8f8f8f;
    }

    .error-msg {
      margin: 0 0 0;
      position: absolute;
      top: 100%;
      right: 0;
      font-size: .75em;
    }
  }

  p label,
  p span {
    display: inline-block;
    vertical-align: middle;
    font-size: .8em;
    width: 50%;
    margin: 0 0 0;
    color: #8f8f8f;
  }

  p label {
    user-select: none;
  }

  p span {
    text-align: right;
  }

  p span a {
    color: #8f8f8f;
  }

  .btn {
    display: block;
    width: 100%;
    margin-top: 30px;

    &:hover,
    &:focus {
      opacity: .8;
    }
  }

  .buttons {
    margin-top: 30px;

    .btn {
      margin-top: 0;
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 1023px) {
    margin: 0 auto;
    width: 100%;
    min-width: 320px;
    max-width: 450px;

    & > div {
      padding: 50px;
      height: calc(100vh - 110px);
    }
  }
`;

export default LoginDiv;