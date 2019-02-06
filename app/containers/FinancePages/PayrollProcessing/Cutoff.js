import styled from 'styled-components';

const Cutoff = styled.div`
  padding: 15px;
  font-size: 13px;

  p.message {
    text-align: left;
  }

  h3 {
    margin-bottom: 5px;
  }

  dl {
    display: block;
    clear: both;
    margin: 0 0 3px;

    dt,
    dd {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0 0;
    }

    dt {
      font-size: .75em;
      color: #80858b;
      width: 65px;
    }

    dd {
      width: calc(100% - 70px);
    }
  }
`;

export default Cutoff;
