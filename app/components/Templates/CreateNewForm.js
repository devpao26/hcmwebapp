import styled from 'styled-components';
import { BorderColor, RedColor } from 'components/StyleUtils/Colors';

const CreateNewForm = styled.form`
  margin: 0 0 0;
  font-size: 12px;
  position: relative;
  max-height: 87vh;
  overflow: auto;
  
  .form-saving {
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.7);
    padding-top: 50%;
  }

  .error-msg {
    padding: 0 15px 15px;
    color: ${RedColor};
    margin: 0 0 0;
    font-size: .9em;
    font-style: italic;
  }

  .action_button {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 15px;

    .btn {
      width: 130px;
      margin: 0 5px;
      display: inline-block;
      vertical-align: middle;

      &:hover {
        opacity: .8;
      }
    }
  }

  .add-worktype,
  .add-btn {
    background-color: #f44336;
    box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
    display: block;
    margin: 5px auto 5px;
    border-radius: 50%;
    color: #fff;
    font-size: .75em;
    width: 26px;
    height: 26px;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }

  .attach {
    font-size: 1em;
    border-bottom: 1px solid ${BorderColor};
    position: relative;
    color: #2b3131;
    cursor: pointer;

    &:hover {
      border-bottom-color: #888;
    }

    span {
      display: inline-block;
      vertical-align: middle;
      width: calc(100% - 20px);
      text-align: left;

      b {
        font-weight: 400;
        font-size: .9em;
        line-height: 1;
        display: inline-block;
        margin-right: 2px;
        background-color: #d8d8d8;
        border-radius: 6px;
        padding: 3px 5px 2px;
      }
    }

    .fa-paperclip {
      vertical-align: middle;
      padding: 2px;
      font-size: 1.5em;
    }

    input {
      display: none;
    }
  }
`;

export default CreateNewForm;
