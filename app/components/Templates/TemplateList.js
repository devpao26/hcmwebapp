import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const TemplateList = styled.div`
  .create-new {
    display: block;
    padding: 12px 5px 10px;
    text-align: center;

    button,
    a {
      cursor: pointer;
      font-size: 1.2em;

      .svg-inline--fa {
        background-color: #f44336;
        box-shadow: 0px 4px 13px 0 rgba(0, 0, 0, 0.3);
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        color: #fff;
        padding: 10px;
        width: 35px;
        height: 35px;
        line-height: 33px;
        cursor: pointer;
        margin-right: 5px;
        margin-top: -1px;
      }

      &:hover {
        opacity: .8;
      }
    }
  }

  .search-filter {
    border-top: 1px solid #fafafc;
    padding: 5px 15px 0;

    form {
      margin-bottom: 5px;
      width: 100%;
      display: block;
    }
  }

  .list {
    border-top: 1px solid #fafafc;

    .list-item {
      margin: 0 0 0;
      border-bottom: 1px solid #fafafc;
      text-align: center;
      position: relative;
      padding: 15px 10px;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: #f1f2f3;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: #0bd38a;
      }
    }

    .message {
      text-align: center;
      font-size: 1.1em;
      padding: 15px 10px;
      margin: 0 0 0;
    }
  }

  ${media.tablet`
    .search-filter {
      form {
        width: 100%;
      }
    }
  `}
`;

export default TemplateList;
