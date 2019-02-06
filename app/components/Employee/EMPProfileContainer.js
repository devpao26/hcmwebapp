import styled from 'styled-components';
import { media } from '../StyleUtils';
import { BorderColor } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  margin: 0 auto 30px;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 96%;
  background: #fff;
  overflow: hidden;
  height: 89vh;
  border-radius: 2px;
  min-height: 200px;
  padding-top: 40px;

  .empprof-content {
    max-height: 83vh;
    overflow-y: auto;
    padding: 20px 15px 10px;
  }

  .empprof-options {
    margin: 0 0 10px;
    text-align: right;

    span,
    .option-menu {
      display: inline-block;
      position: relative;
    }

    span {
      font-size: 1.3em;
    }
  }

  .empprof-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 1.3em;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 0;
    padding: 12px 15px;
    background-color: #2b3131;
    color: #fff;
    z-index: 9;
  }

  .empprof-close {
    z-index: 10;
  }

  .error-msg {
    text-align: center;
  }

  .empprof-section {
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    position: relative;
    margin-bottom: 15px;
    font-size: 12px;
  }

  .flex {
    display: flex;
    margin-bottom: 15px;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;

    .empprof-section {
      margin: 10px 10px;
      max-width: 31.8%;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }

      .comp-list {
        margin: 0 0 0;
        list-style: none;
        padding: 0 0 0;

        ul {
          max-height: 320px;
          overflow-y: auto;
        }

        li {
          padding: 7px 10px 6px;

          p {
            margin: 0 0 0;
            position: relative;

            &.name {
              font-weight: 500;

              small {
                display: block;
                font-weight: 400;
              }
            }

            span,
            button {
              display: inline-block;
              vertical-align: top;
              color: #2b3131;
              font-size: 0.8em;
            }

            span {
              width: calc(100% - 30px);
            }

            button {
              text-decoration: underline;
              padding: 0 0;
              cursor: pointer;

              &:hover {
                opacity: 0.8;
              }
            }
          }
        }

        .data {
          border-bottom: 1px solid ${BorderColor};
          position: relative;
          margin-bottom: 10px;
  
          .content {
            display: inline-block;
            width: calc(100% - 16px);
            color: #17b385;
            cursor: pointer;
          }
  
          .fa {
            font-size: 1em;
            width: 15px;
            text-align: center;
            cursor: pointer;
            outline: 0;
          }
        }


      }
    }
  }

  .leave-credits {
    padding: 10px 10px;
    position: relative;

    table {
      table-layout: fixed;
      max-width: 90%;

      th {
        text-align: left;
        font-weight: 400;
        padding: 1px 5px;
      }

      td {
        font-size: .9em;
        padding: 5px;
      }
    }

    .add-leaves {
      position: absolute;
      right: 0;
      top: 10px;
      cursor: pointer;
    }
  }

  .leave-lists {
    border-top: 1px solid ${BorderColor};
    
    h3 {
      margin: 0 0 0;
      font-size: 1.1em;
      font-weight: 400;
      padding: 5px 10px;
    }
  }

  ${media.handheld`
    .leave-credits {
      .add-leaves {
        position: relative;
        margin-bottom: 10px;
        display: inline-block;
      }
    }

    .flex {
      display: block;

      .empprof-section {
        margin: 0 0 15px;
        max-width: 100%;
      }
    }
  `}
`;

export default Wrapper;
