import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  clear: both;
`;

function ButtonWrapper(props) {
  return (
    <Wrapper className="action_button">
      {Children.toArray(props.children)}
    </Wrapper>
  );
}

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonWrapper;
