import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const MasterList = styled.div`
  width: 100%;
  font-size: 12px;
  margin-bottom: 10px;
  position: relative;
  border-collapse: separate;
  border-spacing: 0 6px;

  .row-container {
    display: table;
    width: 100%;
    position: relative;

    .message {
      margin: 0 0 0;
      padding: 20px 10px;
      text-align: center;
      font-size: 1.1em;
    }

    &:nth-of-type(even) {
      background-color: #fbfcfe;
    }
  }

  ${media.tablet`
    .row-container {
      .actions {
        top: 15px;
        right: 5px;
      }
    }
  `}
`;

export default MasterList;
