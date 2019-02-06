import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const RequestForm = styled.div`
  fieldset {
    border: 0;
    padding: 0 5px;
    margin: 0 0 5px;
    font-size: 14px;
  }
  .head {
    display: block;
    font-size: .8em;
    color: #808489;
    width: 100%;
    padding: 5px 0px;
    border: 0;
    color: rgba(12, 19, 29, 0.7);
  }
  .fields {
    display: block;
    min-width: 98%;
    outline: 0;
    padding: 7px 0px;
    font-size: 1em;
    border-bottom: 1px solid ${BorderColor};
    position: relative;
    color: #2b3131;
  }
  select {
    position: relative;
    width: 80%;
    cursor: pointer;
    outline: none;
  }
  .dropdown {
    float: right;
    position: relative;
    bottom: 25px;
    right: 3px;
    button {
      border: 0;
      cursor: pointer;
    }
  }
  .fa-caret-down {
    color: #7f848b;
  }
  .time-half {
    display: inline-block;
    min-width: 48%;
    margin-left: 2%;
    padding: 0;
    label {
      border: 0;
    }
    .peer-half {
      display: flex;
      width: 40px;
      span {
        align-self: center;
        margin: 0px 10px;
      }
      button {
        position: relative;
        top: 5px;
        left: -10px;
        cursor: pointer;
        width: 0;
      }
    }
  }
  .half {
    display: inline-block;
    min-width: 41%;
    margin-left: 2%;
    padding: 0;
    
    span {
      display: flex;
      i {
        align-self: center;
        position: relative;
        right: 15px;
        font-size: 10px;
        color: #2abb9c;
      }
    }
  }
  .bgInput {
    background: #fbfcfe;
    .fa-circle {
      font-size: 10px;
      color: #c9d1da;
    }
  }
  .add-template {
    display: flex;
    justify-content: center;
    width: 100%;
    &:hover {
      background: transparent !important;
    }
    i { 
      font-size: 1em;
      margin: 5px 0px 0px 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;  
      color: #fff;
      box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.3);              
    }
    .fa-plus {
      background: #ec5f59;
    }
  }

  .flexi {
    display: inline-flex;
    color: rgb(128, 132, 137);
    padding: 5px 8px;
    font-size: 0.8em;
    label {
      border: 0 !important;
      width: 25%;
    }
  }
  .flexi-menu {
    .arrow-down {
      margin: -2px;
    }
  }
  .flexi-half {
    display: inline-block;
    width: 48%;
    height: 45px;
    margin-left: 2%;
    border-bottom: 1px solid ${BorderColor};
  }
  .flexi-none {
    background: #fbfcfe;
    padding: 15px 15px;
  }
  .divide {
    position: relative;
    top: 5px;
    left: 5px;
    color: #7f848b;
  }
  .weeks {
    position: relative;
    left: 7px;
    color: #c9d1da;
  }
  // Change selection default color
  .radioGroup {
    input[type='radio']:after {
      width: 16px;
      height: 16px;
      border-radius: 20px;
      position: relative;
      right: 2px;
      top: -1px;
      content: '';
    }
    input[type='radio']:checked:after {
      background-color: #2abb9c;
      display: inline-block;
    }
  }
  .activeStatus {
    color: #2abb9c;
  }
  .defaultStatus {
    color: #a4a7ab;
  }
  .full-width {
    margin-left: 2%;
  }
`;

export default RequestForm;
