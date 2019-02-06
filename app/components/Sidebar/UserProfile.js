import styled from 'styled-components';

const UserProfile = styled.div`
  background-color: #2b3131;
  padding: 20px 0 0;
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 2;

  .user-avatar {
    width: 65px;
    height: 65px;
    border-radius: 65px;
    border: 1px solid #fff;
    padding: 5px;
  }

  h2 {
    margin: 5px 0 0;
    font-size: 14px;
    font-weight: 400;

    .fa {
      font-size: 1.2em;
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
      transform: rotate(-90deg);
      transition: transform .2s ease-in-out;
    }
  }

  p {
    margin: 0 0 0;
    padding: 0 10px;
    font-size: 11px;
    color: #abb6c7;
  }

  nav {
    margin-top: 15px;
    /* max-height: 0; */
    overflow: hidden;
    transition: max-height .5s ease-in-out;

    button {
      background-color: #0bd38a;
      color: #fff;
      font-weight: 700,
      text-align: center;
      width: 100%;
      padding: 8px;
      cursor: pointer;

      &:hover {
        opacity: .8;
      }
    }
  }

  &.active {
    h2 .fa {
      transform: rotate(0deg);
    }

    /* nav {
      max-height: 600px;
      transition: max-height .3s ease-in-out;
      overflow: visible;
    } */
  }
`;

export default UserProfile;
