import styled from 'styled-components';
import { media } from '../StyleUtils';
import { BoxShadow, RedColor } from '../StyleUtils/Colors';

const Access = styled.div`
  background-color: #fff;
  box-shadow: ${BoxShadow};

  .filters {
    font-size: .8em;
    margin-bottom: 10px;

    label { padding-right: 8px; }
  }

  .groups {
    padding: 20px 0;
  }

  .action_button {
    padding: 0 15px 15px;
    text-align: right;

    .message {
      color: ${RedColor};
      font-style: italic;
    }

    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 180px;
    }
  }

  ${media.handheldLandscape`
    .action_button {
      text-align: center;
    }
  `}
`;

export default Access;
