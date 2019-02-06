import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: right;
  font-size: 12px;
  padding: 15px 15px;
  position: relative;
  z-index: 2;

  ul {
    list-style: none;
    margin: 0 0 0;
    padding: 0 0 0;
  }

  li {
    display: inline-block;
    vertical-align: middle;
    border-bottom: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;

    a,
    span {
      padding: 0 5px !important;
      color: #525972;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      outline: 0;

      &:hover {
        color: #0bd38a;
      }
    }
  }

  li.disabled {
    a,
    span {
      color: #aaa;
      cursor: default;

      &:hover {
        color: #aaa;
        opacity: 1;
      }
    }
  }

  li.active {
    background-color: transparent !important;

    a {
      color: #0bd38a;
    }
  }
`;

export default Wrapper;
