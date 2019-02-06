/*
 * Grid Filter
 *
 * Pass a prop width
 * width value should be number with %
 * ie: 60% or 40%
 * when used side by side, width values should be equal to 99%
 * only to compensate on the extra 5px margin in the right side of the element
 *
 */
import styled from 'styled-components';

const Filter = styled.div`
  display: inline-block;
  vertical-align: top;
  width: ${(props) => props.width ? props.width : '100%'};
  padding: 0 10px;
  font-size: .7em;

  button {
    outline: 0;
    border: 0;
    background: none;
    color: #2abb9c;
    padding: 1px 3px;
    border-radius: 2px;
    text-align: center;
    margin-right: 3px;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-block;

    &:hover,
    &.active {
      background-color: #2abb9c;
      color: #fff;
    }
  }

  .checkbox {
    margin-top: 3px;
    padding-left: 1px;
    display: block;
    color: #2abb9c;
    cursor: pointer;

    &:hover > * {
      opacity: .8;
    }

    input {
      display: none;
    }

    .fa {
      display: inline-block;
    }

    .fa-square-o {
      margin-right: 1.5px;
    }

    .fa-check-square-o {
      display: none;
    }

    input:checked ~ .fa-check-square-o {
      display: inline-block;
    }

    input:checked ~ .fa-square-o {
      display: none;
    }

    span {
      padding-left: 1px;
    }
  }
`;

export default Filter;
