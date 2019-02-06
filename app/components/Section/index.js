import styled from 'styled-components';

const Section = styled.section`
  background: #fff;
  box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  position: relative;
  margin-bottom: ${(props) => props.bottom ? props.bottom : '13px'};
  font-size: 12px;

  width: ${(props) => props.half ? '49%' : '100%'};
  ${(props) => props.half ? 'display: inline-block; vertical-align: top;' : 'display: block;'}

  ${(props) => props.half && '&:nth-child(even) { margin-right: 20px; }'}

  .see-more {
    float: right;
    margin: 0 10px 5px 0;
    font-size: .8em;
    color: #0bd38a;
    text-decoration: none;
  }

  &:after {
    clear: both;
    content: '';
    display: table;
  }
`;

export default Section;
