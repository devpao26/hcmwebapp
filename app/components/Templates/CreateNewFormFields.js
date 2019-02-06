import styled from 'styled-components';
import { BorderColor, RedColor, BorderHoverColor, BorderActiveColor } from 'components/StyleUtils/Colors';
import { media } from 'components/StyleUtils';

const Fields = styled.div`
  padding: ${(props) => props.noPaddingTop ? '0 15px' : '15px 15px 0'};
  background-color: ${(props) => props.bgColor ? props.bgColor : 'transparent'};
  position: relative;
  .hover {
    cursor: pointer;
  }
  label {
    display: block;
    font-size: .9em;
    color: #6d7279;
    margin: 5px 0px;

    .toggle {
      vertical-align: middle;
      margin-top: -1px;

      label {
        margin: 0;
      }
    }

    &.inline {
      display: inline-block;
    }
  }

  input,
  select {
    width: 100%;
    border-bottom: 1px solid ${BorderColor};
    padding: 5px 0;

    &.error {
      border-bottom-color: ${RedColor}; 
    }

    &:hover {
      border-bottom-color: ${BorderHoverColor};
    }

    &:focus {
      border-bottom-color: ${BorderActiveColor}; 
    }
  }

  input {
    padding: 5px;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    border: 1px solid ${BorderColor};
    padding: 5px;

    &:hover {
      border-bottom-color: #c5c5c5;
    }

    &:focus {
      border-bottom-color: #a5a5a5; 
    }
  }
  .font {
    display: block;
    font-weight: 600;
    font-size: .9em;
  }
  .select-custom {
    position: relative;
    display: inline-block;
    min-width: 55px;
    margin-right: 3px;

    &.long {
      min-width: 145px;
    }
    &.xlong {
      min-width: 370px !important;
    }
    .react-datepicker__input-container {
      width: 100%;
      display: block;
    }

    .fa-caret-down {
      position: absolute;
      top: 7px;
      right: 2px;
      z-index: 1;
    }

    select {
      position: relative;
      z-index: 2;
      padding-left: 5px;
      padding-right: 10px;
      appearance: none;
      border-radius: 0;
    }

    &.disabled {
      select {
        opacity: .5;
      }

      .fa-caret-down {
        opacity: .5;
      }
    }
  }

  .half {
    margin: 3px 15px 0 2px;
    display: inline-block;
    vertical-align: top;
    width: 33%;
  }
  .half-time {
      display: inline-block;
      width: 40%;
  }

  .one-third {
    margin: 3px 15px 0 2px;
    display: inline-block;
    vertical-align: top;
    width: 30%;

    &.last {
      margin-right: 0;
    }

    .select-custom {
      display: block;
      width: 100%;
    }
  }

  .two-third {
    margin: 3px 15px 0 2px;
    display: inline-block;
    vertical-align: top;
    width: 63%;

    .select-custom {
      display: block;
      width: 100%;
    }
  }

  .flexi {
    .half {
      margin-bottom: 7px;
    }
  }

  .error-msg {
    padding: 0 0 0;
    font-size: .8em;
  }

  /* Added by pao */
  .active-label {
    color: rgb(236, 95, 89);
  }
  .active-textarea {
    border: 1px solid rgb(236, 95, 89);
  }
  .active-border-bottom {
    border-bottom: 1px solid rgb(236, 95, 89);
  }
  .full {
    margin: 3px 15px 0 2px;
    display: inline-block;
    vertical-align: top;
    width: 99%;
  }

  .inactive {
    label,
    select[disabled],
    input[disabled],
    .fa-caret-down {
      opacity: .4;
    }
  }

  .btn-delete {
    position: absolute;
    top: 50%;
    right: 5px;
    margin-top: -6px;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }

  &:hover .btn-delete {
    opacity: 1;
  }

  .inline-flex {
    display: inline-flex;
  }
  .custom-check {
    display: inline-block;
  }
  .label-check {
    margin: -16px 20px;
  }
  .blurred-fields {
    opacity: 0.5;
  }
  .required-textarea {
    border: 0.5px solid rgb(236, 95, 89);
  }
  .leave-type {
      display: flex;
  }
  .required-label {
      color: rgb(236, 95, 89);
  }
  .required-select {
      border-bottom: 1px solid rgb(236, 95, 89) !important;
  }
  .hide {
    display: none;
  }
  .cursor-pointer {
    cursor: pointer;
    color: #4875a3;
  }
  .grids-wrapper {
    display: flex;
    flex-flow: nowrap;
    margin: 10px;

    .grids-5, .grids-7 {
      box-shadow: 0px 8px 25.4px 1.6px rgba(0, 0, 0, 0.12);
    }
    .grids-1 {
      width: 8.33%;
    }
    .grids-5 {
      width: 41.65%;
    }
    .grids-7 {
      width: 58.31%;
    }
    .h-200 {
      height: 200px;
    }
    .h-445 {
      height: 445px;
    }
  }
  .scheds {
    dl {
      display: block;
      margin: 0 0 0;
      padding: 0 0 0;
      background: #fbfcfe;
      border-bottom: 1px solid #e5e6eb;
    }
    dl dt {
      margin: 0 0 0;
      padding: 8px 5px;
      display: inline-block;
      vertical-align: middle;
      width: 49%;
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
    dl dd {
      margin: 0 0 0;
      padding: 8px 5px;
      display: inline-block;
      vertical-align: middle;
      width: 49%;
    }
    .shift-details {
      dl dt {
        width: 20%;
      }
      dl dd {
        width: 80%;
      }
    }
    .time {
      display: inline-block;
      vertical-align: middle;
      width: 49%;
      text-align: center;
    }
    .days {
      position: relative;
      left: 10px;
    }
  }

  /* end added by pao */
  
  ${media.handheld`
    .select-custom {
      min-width: 35px;
    }
  `}
`;

export default Fields;
