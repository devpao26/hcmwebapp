import styled from 'styled-components';

const Progress = styled.div`
  display: inline-block;
  vertical-align: middle;
  background-color: #e0e6f0;
  position: relative;
  width: calc(100% - 35px);
  min-width: 80px;
  height: 10px;
  border-radius: 5px;
  cursor: pointer;

  label {
    position: absolute;
    height: 10px;
    border-radius: 5px;
    width: 0;
    background-color: #75bef9;
    cursor: pointer;
  }

  label[data-progress*="100"] {
    background-color: #0bd38a;
  }

  & + span {
    display: inline-block !important;
    vertical-align: middle;
    width: 35px;
    text-align: center;
    font-size: .9em !important;
  }
`;

export default Progress;