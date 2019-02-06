import styled from 'styled-components';
import { RedColor } from 'components/StyleUtils/Colors';

const Wrapper = styled.div`
  font-size: 12px;
  padding: 10px;
  position: relative;

  .form-saving {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgba(255,255,255,.7);
  }

  p {
    margin: 0 0 15px;

    .label {
      display: block;
      font-size: .8em;
      color: #6d7279;
    }

    textarea {
      border: 1px solid #d3d6db;
      padding: 5px;
      width: 100%;
      display: block;
      resize: none;
      min-height: 100px;
    }
  }

  .error-msg {
    color: ${RedColor};
    font-size: .9em;
    font-style: italic;
    text-align: left;
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
`;

export default Wrapper;
