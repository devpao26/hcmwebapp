import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Header = styled.div`
  background: #fbfcfe;
  padding: 20px;
  border-bottom: 1px solid #fafafc;

  .template-icon,
  .template-details {
    display: inline-block;
    vertical-align: top;
  }

  .template-icon {
    max-width: 120px;
    border-radius: 50%;
    background-color: #4875a3;
    text-align: center;
    padding: 25px;

    img {
      display: inline-block;
    }
  }

  .template-details {
    width: calc(100% - 125px);
    padding-left: 10px;

    h3 {
      font-size: 1.6em;
      font-weight: 400;
      margin: 10px 0;

      button {
        padding: 0;
        margin-left: 4px;
      }

      .svg-inline--fa {
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
        color: #fff;
        padding: 7px;
        width: 25px;
        height: 25px;
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }

      .fa-pencil-alt {
        background-color: #0bd38a;
      }

      .fa-minus {
        background-color: #f44336;
      }
    }

    p {
      margin: 0 0 3px;

      small {
        display: block;
        color: #82878d;
        font-size: .75em;
      }

      span {
        display: inline-block;
        vertical-align: top;
        min-width: 70px;
        margin-right: 10px;
      }
    }
  }
  ${media.handheld `
    padding: 10px;

    .template-icon {
      max-width: 90px;
      padding: 17px;
    }

    .template-details {
      width: calc(100% - 95px);
    }
  `}
`;

export default Header;
