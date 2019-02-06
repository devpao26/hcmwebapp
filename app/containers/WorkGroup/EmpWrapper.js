import styled from 'styled-components';
import { ActiveColor } from '../../components/StyleUtils/Colors';

const Wrapper = styled.div`
  position: relative;
  min-height: 100px;

  .loading-cont {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
    z-index: 10;
  }

  .error-msg {
    font-size: 1.1em;
    text-align: center;
  }

  h3 {
    margin: 0 0 10px;
    padding-right: 25px;
    font-size: .9em;
    font-weight: 400;
    position: relative;

    .total-emp {
      display: block;

      b {
        color: ${ActiveColor};
      }
    }
  }

  .add-emp {
    position: absolute;
    top: 0;
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
  
  .pagination {
    padding-bottom: 0;
  }

  .action_button {
    padding-top: 10px;
    text-align: center;

    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 40%;
      margin: 0 5px;
    }
  }
`;

export default Wrapper;
