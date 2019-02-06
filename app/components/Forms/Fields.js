/**
 * Fields component
 * NOTE: pass a classname if you want it to take half of the space
 *       and put a 'last' class on the last element
 * Class Names:
 *    half
 *    third
 *    fourth
 *    last (always put this on the last element in combination with other classes)
 */
import styled from 'styled-components';

const Fields = styled.div`
  margin: 0 0 13px;

  .error {
    font-style: italic;
    font-size: .9em;
  }

  &.half,
  &.third,
  &.fourth {
    display: inline-block;
    vertical-align: top;
    margin-right: 16px;
  }

  &.half {
    width: 48%;
  }

  &.third {
    width: 30.7%;
  }

  &.fourth {
    width: 24%;
  }

  &.last {
    margin-right: 0;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }
  
  .react-datepicker__input-container input {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #d8d8d8;
    padding: 5px 5px;
    outline: 0;
  }

  .inline {
    display: inline-block;
    min-width: 55px;
  }
`;

export default Fields;
