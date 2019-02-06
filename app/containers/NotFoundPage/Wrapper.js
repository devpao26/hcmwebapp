import styled from 'styled-components';
import { media } from '../../components/StyleUtils';

const Wrapper = styled.div`
  padding: 10% 40px 0;
  text-align: center;

  .ninja-404,
  .not-found-message {
    display: inline-block;
    vertical-align: middle;
  }

  .ninja-404 {
    width: 400px;
  }

  .not-found-message {
    width: 60%;

    h1 {
      font-weight: 400;
      line-height: 1;
      
      span,
      small {
        display: inline-block;
        vertical-align: middle;
      }

      span {
        font-size: 4em;
      }

      small {
        font-size: 1.4em;
        padding: 0 10px;
      }
    }

    p {
      font-size: 2em;
      margin: 0 0 15px;
    }

    a {
      display: inline-block;
      padding: 10px 15px;
      background-color: #7f848b;
      border-radius: 2px;
      color: #fff;
      box-shadow: 0px 5px 18.8px 1.2px rgba(0, 0, 0, 0.2), 0px 3px 10px 0 rgba(0, 0, 0, 0.3);
      transition: opacity .2s ease-in-out;
      text-decoration: none;
      font-size: .9em;

      &:hover {
        opacity: .9;
      }
    }
  }

  ${media.handheldLandscape`
    padding: 20px;

    .ninja-404 {
      display: block;
      margin: 0 auto;
      width: 100%;
      max-width: 320px;
    }

    .not-found-message {
      width: 100%;
      padding: 15px 0;
      font-size: .5em;

      a {
        font-size: 1.5em;
      }
    }
  `}
`;

export default Wrapper;
