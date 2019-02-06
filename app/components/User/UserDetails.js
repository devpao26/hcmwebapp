import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const UserDetails = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 20px;
  border-right: 1px solid #eff3f6;
  width: calc((100% - 30%) - 180px);

  p {
    margin: 0 0 0;
  }

  p.user-name {
    font-size: 1.4em;
    margin-bottom: 10px;
  }

  p.access {
    font-size: 2.35em;
    color: #fff;
    padding: 5px 0;

    .fa {
      display: inline-block;
      margin-right: 5px;
      width: 50px;
      height: 50px;
      line-height: 44px;
      background-color: #242a2a;
      text-align: center;
      border-radius: 50px;
      padding: 3px;
    }
  }

  .regular {
    color: #0bd38a;
    font-weight: bold;
  }

  .inline-box {
    display: inline-block;
    vertical-align: top;
    width: 60%;
  }

  .inline-box.last {
    padding-left: 20px;
    width: 40%;
  }

  ${media.tablet`
    width: calc(100% - 115px);
    border-right: 0;
    vertical-align: top;
    padding: 0 0 0 10px;
  `}

  ${media.handheld`
    .inline-box {
      display: block;
      width: 100%:
    }

    .inline-box.last {
      padding-top: 10px;
      padding-left: 0;
      width: 100%;
    }
  `}
`;

export default UserDetails;
