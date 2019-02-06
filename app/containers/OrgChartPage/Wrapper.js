import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Wrapper = styled.div`
    padding: 20px 10px;
    margin: 30px 25px;
    border: dashed 1px #d7d7d7;
    position: relative;
    font-size: 16px;

    h3 {
        position: absolute;
        top: -1px;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #2b3131;
        font-weight: 400;
        font-size: .9em;
        margin: 0 0 0;
        padding: 5px 2px;
        background-color: #fff;
    }

    .expander {
        outline: 0;
        font-size: 1.5em;
        color: #9ea3b4;
        position: absolute;
        right: 0;
        top: 3px;
        padding: 3px 7px 3px;
        display: none;
        z-index: 2;
    }

    ${ media.tablet`
        transition: all .5s ease-in-out;
        max-height: 0;
        overflow: hidden;

        &.expand {
            max-height: 999em;
            transition: all .3s ease-in-out;
        }

        h3 {
            position: relative;
            text-align: center;
            font-size: 1em;
            min-height: 32px;
        }

        .expander {
            display: block;
            transform: rotate(0);
            transition: all .2s ease-in-out;
        }

        &.expand {
            .expander {
                transform: rotate(-180deg);
            }
        }
    `}
`;

export default Wrapper;