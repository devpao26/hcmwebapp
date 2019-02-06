import styled from 'styled-components';

const Listings = styled.div`
  position: relative;
  font-size: 12px;
  padding: 15px;
  .right-emp {
    float: right;
  }
  .error-msg {
    text-align: center;
    margin: 50px;
  }

  h3 {
    margin: 0 0 10px;
    padding-right: 25px;
    font-size: .9em;
    font-weight: 400;
    position: relative;
  }

  .add-emp {
    position: absolute;
    top: -1px;
    right: 8px;
    padding: 0;
    cursor: pointer;
    
    .svg-inline--fa {
      padding: 6px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background-color: #ec5f59;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
      color: #fff;
    }

    &:hover {
      opacity: .8;
    }
  }

  dl {
    cursor: pointer;
    padding: 7px 10px;

    &:hover,
    &.active {
      background-color: #f1f2f3;
    }
  }

  .search-filter {
    padding: 0;

    form {
      width: 100%;
      margin-right: 0;

      input:not([type=checkbox]):not([type=radio]) {
        width: 100%;
      }
    }
  }

  .pagination {
    /* border-top: 1px solid #d3d6db; */
    padding-bottom: 0;
  }
`;

export default Listings;
