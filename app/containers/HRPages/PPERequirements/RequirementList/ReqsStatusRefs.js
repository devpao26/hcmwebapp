import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 14px;
  
  .content {
    p {
      margin: 0 0 0;
      padding: 15px 15px 10px;

      button {
        display: block;
        width: 60%;
        margin: 0 auto 10px;
        padding: 10px 5px;
        border-radius: 2px;
        cursor: pointer;
        color: #fff;

        &.Approved {
          background: #2abb9c;
        }

        &.Approval {
          background: #f57c27;
        }

        &.Disapproved {
          background: #df6236;
        }

        &:hover {
          opacity: .8;
        }
      }
    }
  }
`;

export default Wrapper;