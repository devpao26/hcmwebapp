import styled from 'styled-components';

const OrgChartItem = styled.div`
  min-height: 160px;
  flex: 1;
  font-size: .9em;
  position: relative;
  display: inline-block;
  margin: 0 5px;
  min-width: 170px;
  max-width: 185px;

  .user-avatar {
    background-color: #242a2a;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    box-shadow: 3px 10px 15px 1px rgba(34, 31, 32, 0.3);
  }

  .user-avatar + div {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    background-color: ${props => props.color === 'black' ? 'rgba(0,0,0,.85)' : props.color === 'blue' ? 'rgba(57,118,167,.85)' : props.color === 'green' ? 'rgba(0,127,106,.85)' : 'rgba(136,92,149,.85)'};
    color: #fff;
    border-radius: 3px;
    padding: 7px 5px 0;

    p {
      margin: 0 0 0;
      line-height: 1;

      a {
        color: #fff;
        text-decoration: none;
      }
    }

    p.name {
      padding: 3px 5px 10px;
      font-size: .85em;
    }

    p.position {
      padding-bottom: 10px;
    }

    .option-menu {
      z-index: 9;
      font-size: 13px;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1px;
      color: #2b3131;

      .fa {
        color: #fff;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    padding-bottom: 15px;

    .user-avatar + div {
      padding-bottom: 5px;
    }
  }

  @media screen and (max-width: 414px) {
    max-width: 100%;
  }
`;

export default OrgChartItem;