/**
 * Status Icon on table list
 *
 * NOTE: Need to determine the account statuses and their respective colors
 */
import styled from 'styled-components';
import { ActiveColor, NewColor, InactiveColor, BlockedColor, RedColor } from 'components/StyleUtils/Colors';

const Status = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  display: inline-block !important;
  background-color: #c9d1da;

  &.Active,
  &.Approve,
  &.Approved {
    background-color: ${ActiveColor};
  }
  &.New {
    background-color: ${NewColor};
  }
  &.Inactive,
  &.Pending {
    background-color: ${InactiveColor};
  }
  &.Blocked {
    background-color: ${BlockedColor};
  }
  &.Suspended,
  &.Resigned,
  &.Terminated,
  &.Reject,
  &.Rejected {
    background-color: ${RedColor};
  }
`;

export default Status;
