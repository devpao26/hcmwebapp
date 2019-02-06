import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const TemplateList = styled.div`
  button {
    padding: 13px 10px;
    border-bottom: 1px solid #f9f9fc;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: left;

    .fa-plus {
      background-color: #f44336;
      box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
      margin-left: 8px;
      border-radius: 50%;
      color: #fff;
      font-size: .65em;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
    }

    &:hover,
    &.active {
      background-color: #efefef;
    }
  }
`;

export default TemplateList;
