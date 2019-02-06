import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Enrolled = styled.div`
  font-size: 12px;
  
  .enrolled-heading {
    border-bottom: 1px solid #fafafc;
    padding: 11px 15px 10px;
    font-size: 1.2em;

    .option-menu {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin-top: -1px;
      margin-left: 8px;

      .svg-inline--fa {
        background-color: #f44336;
        box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
        color: #fff;
        padding: 7px;
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
    }

    .filters {
      display: inline-block;
      margin-left: 15px;

      button {
        margin-left: 2px;
      }
    }
  }

  .enrolled-list {
    padding: 18px 10px 8px;
    text-align: center;

    .message {
      text-align: center;
      font-size: 1.1em;
    }

    .enrolled-items {
      position: relative;
      display: inline-block;
      margin: 0 5px 15px;
      box-shadow: 0px 4px 13px 1px rgba(0, 0, 0, 0.12);
      width: 48%;
      padding: 10px;
      text-align: left;
      min-height: 50px;

      p,
      .btn-delete {
        display: inline-block;
        vertical-align: middle;
      }

      p {
        margin: 0 0 0;
        text-align: left;
        width: calc(100% - 25px);

        .enrolled-group,
        .enrolled-name,
        .user-avatar {
          display: inline-block;
          vertical-align: middle;
        }

        .enrolled-name {
          text-transform: capitalize;
          max-width: calc(100% - 45px);
          
          small {
            display: block;
            text-transform: none;
          }

          .enrolled-inherit {
            font-style: italic;
          }
        }

        .enrolled-group {
          line-height: 28px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: #a8a8a8;
          margin-right: 5px;
        }
      }

      .btn-delete {
        display: none;
        vertical-align: middle;
        transition: all .2s ease-in-out;
        background-color: #f44336;
        box-shadow: 0px 4px 13px 0 rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        color: #fff;
        /* width: 20px; */
        height: 20px;
        cursor: pointer;
        padding: 0 5px;

        &:hover {
          opacity: .8;
        }
      }

      &:hover .btn-delete {
        display: inline-block;
      }
    }
  }

  ${media.handheld `
    .enrolled-heading {
      font-size: 1em;
      text-align: center;

      .filters {
        margin-left: 0;
        margin-top: 10px;
      }
    }

    .enrolled-list {
      .enrolled-items {
        width: 85%;
      }
    }
  `}
`;

export default Enrolled;
