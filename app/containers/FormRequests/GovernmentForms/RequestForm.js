/**
 * Form styled components
 */
import { BorderColor, RedColor } from 'components/StyleUtils/Colors';
import styled from 'styled-components';

const RequestForm = styled.div`
    border: 0;
    label {
        color: rgba(12, 19, 29, 0.7);
        font-size: .8em;        
        margin: 5px 0px;
        display: block;
    }
    textarea {
        border: 1px solid rgb(211, 214, 219);
    }
    .border-highlight {
        border-bottom: 0.5px solid #d3d6db;
        padding-bottom: 5px;
    }
    fieldset {
        border: 0;
        padding: 0 15px;
        margin: 0 0 15px;

        label {
        display: block;
        font-size: .8em;
        color: #808489;

        span {
            color: ${RedColor};
        }
        }

        .middle {
        display: inline-block;
        vertical-align: middle;
        width: 8%;
        text-align: center;
        }

        .half {
        display: inline-block;
        vertical-align: middle;
        width: 46%;
        border-bottom: 1px solid ${BorderColor};
        position: relative;

        &:hover {
            border-bottom-color: #888;
        }

        .fa {
            position: absolute;
            top: 9px;
            right: 2px;
        }

        &.error {
            border-bottom-color: ${RedColor};
        }

        }
        .react-datepicker-wrapper,
        .react-datepicker__input-container {
        display: block;
        }

        .leave-type {
        font-size: 1em;
        border-bottom: 1px solid ${BorderColor};
        position: relative;
        color: #2b3131;

        &:hover {
            border-bottom-color: #888;
        }

        span {
            display: inline-block;
            width: calc(100% - 18px);
        }

        &.error {
            border-bottom-color: ${RedColor};
        }
        }

        input {
        display: block;
        width: 100%;
        outline: 0;
        padding: 7px 3px;
        }

        textarea {
        display: block;
        width: 100%;
        min-height: 150px;
        padding: 7px 5px;
        border: 1px solid ${BorderColor};
        resize: none;

        &:hover {
            border-color: #888;
        }

        &.error {
            border-color: ${RedColor};
        }
        }

        .attach {
            font-size: 1em;
            border-bottom: 1px solid ${BorderColor};
            position: relative;
            color: #2b3131;
            cursor: pointer;

            &:hover {
                border-bottom-color: #888;
            }

            span {
                display: inline-block;
                vertical-align: middle;
                width: calc(100% - 20px);
                text-align: left;

                b {
                font-weight: 400;
                font-size: .9em;
                line-height: 1;
                display: inline-block;
                margin-right: 2px;
                background-color: #d8d8d8;
                border-radius: 6px;
                padding: 3px 5px 2px;
                }
        }

        .fa-paperclip {
            vertical-align: middle;
            padding: 2px;
            font-size: 1.5em;
        }
        }

        &.center {
        text-align: center;
        padding: 20px 0 0;

        button {
            width: 45%;
            border-radius: 2px;
        }
        }

        .option-menu {
        position: relative;
        z-index: 9;
        font-size: 13px;
        display: inline-block;
        }
    }
    .attach {
        font-size: 1em;
        border-bottom: 1px solid ${BorderColor};
        position: relative;
        color: #2b3131;
        cursor: pointer;

        &:hover {
        border-bottom-color: #888;
        }

        span {
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 20px);
        text-align: left;

        b {
            font-weight: 400;
            font-size: .9em;
            line-height: 1;
            display: inline-block;
            margin-right: 2px;
            background-color: #d8d8d8;
            border-radius: 6px;
            padding: 3px 5px 2px;
        }
        }

        .fa-paperclip {
        vertical-align: middle;
        padding: 2px;
        font-size: 1.5em;
        }

        input {
        font-size: 12px;
        position: absolute;
        left: 0;
        top: -5px;
        opacity: 1;
        display: none !important;
        
        }
    }
    .download-file {
        position: relative;
        top: 5px;
        color: rgba(12, 19, 29, 0.7);
        cursor: pointer;
        text-decoration: underline;
        font-size: 1em;
        &:hover {
            opacity: 0.6;
        }
    }
    .required-textarea {
        border: 0.5px solid rgb(236, 95, 89);
    }
    .required-label {
        color: rgb(236, 95, 89);
    }
    .error-message {
        color: rgb(236, 95, 89);
        font-style: italic;
    }
    .required-select {
        border-bottom: 1px solid rgb(236, 95, 89) !important;
    }
    .download-link {
        color: rgba(12, 19, 29, 0.7);
        float: right;
    }
    .dl-form {
        font-weight: bold;
        font-size: .9em;
    }

`;

export default RequestForm;
