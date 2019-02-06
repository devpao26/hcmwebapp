import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Wrapper = styled.nav`
  position: absolute;
  font-size: 12px;
  text-align: left !important;

  ${(props) => (props.position === 'left') && 'top: 0; right: 100%;'}
  ${(props) => (props.position === 'bottom') && 'top: 100%; right: 0;'}
  ${(props) => !props.position && 'top: 0; left: calc(100% + 3px);'}

  width: ${(props) => props.width ? props.width : '200px'};
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  background-color: #fff;
  z-index: 99;

  h2 {
    background-color: #2b3131;
    color: #fff;
    margin: 0 0 8px;
    padding: 5px 10px;
    font-weight: 400;
    font-size: 1em;
    box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.12);
  }

  button,
  a {
    display: block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    font-size: .9em;
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid #e5e6eb;

    &:hover,
    &.active {
      background: #f1f2f3;
    }
  }

  label {
    display: block;
    width: 100%;
    padding: 5px 8px;
    border-bottom: 1px solid #e5e6eb;
    font-size: .9em;
    cursor: pointer;

    input[type="checkbox"] {
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 2px;
    }

    &:hover {
      background-color: #f8f8f8;
    }
  }

  ${media.tablet`
    ${(props) => (props.position === 'left') && 'top: 0; right: 100%;'}
    ${(props) => (props.position === 'bottom') && 'top: 100%; right: 0;'}
    ${(props) => !props.position && 'top: 0; right: calc(100% + 3px); left: auto;'}
  `}
`;

export default Wrapper;
