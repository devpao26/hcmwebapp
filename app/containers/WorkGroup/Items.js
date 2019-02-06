import styled from 'styled-components';

const Items = styled.div`
  display: table;
  table-layout: fixed;
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 2px;
  margin-top: 20px;
  background-color: ${(props) => props.bgColor ? props.bgColor : '#242a2a'};

  &:first-child {
    margin-top: 0;
  }

  p {
    color: #fff;
    margin: 0 0 0;
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    text-align: center;
    padding: 0 20px;

    small {
      font-size: .8em;
      color: #dfdfdf;
      display: block;
    }

    a {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }
  }

  .option-menu {
    float: right;
    margin-top: 20px;
    margin-right: 5px;
    position: relative;
    /* position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 11; */
    
    .svg-inline--fa {
      color: #fff;
    }

    nav {
      h2 {
        background-color: ${(props) => props.bgColor ? props.bgColor : '#242a2a'};
      }
    }
  }

  nav h2 {
    background-color: #5188be;
    text-align: left;
    margin: 0 0 0;
  }
`;

export default Items;
