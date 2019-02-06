import styled from 'styled-components';

const Config = styled.div`
  background: #fff;
  position: relative;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.12);
  margin-bottom: 10px;
  padding: 12px 10px 13px;

  .name {
    & > p {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0 0;
      width: calc(100% - 25px);
    }
  }

  .sub-item {
    width: 50%;
    padding-top: 5px;
  }
`;

export default Config;
