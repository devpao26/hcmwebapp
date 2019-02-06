import { css } from 'styled-components';

const AdminButtonStyle = css`
  display: block;
  text-align: center;
  margin: 0 20px 40px;
  width: 200px;
  min-height: 130px;
  border-radius: 2px;
  padding: 3px 10px 5px;
  background-color: #ffffff;
  box-shadow: 0 5px 13px 1px rgba(0, 0, 0, 0.12);
  color: #2b3131;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;

  /* remove later */
  &.dead-btn {
    opacity: .5;
    cursor: default;
  }

  &[data-smallSpacing] {
    margin: 0 10px 20px;
    width: 180px;
  }

  .fa,
  .svg-inline--fa {
    margin-top: 15px;
    background-color: #4875a3;
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    font-size: 2.5em;
    width: 70px;
    height: 70px;
    line-height: 50px;
  }

  .svg-inline--fa {
    padding: 17px;
  }

  &[data-grayIcon] .fa {
    background-color: #7f848b;
  }

  span {
    display: block;
    width: 100%;
    margin-top: 10px;
    font-size: .95em;
    font-weight: 500;
  }
`;

export default AdminButtonStyle;
