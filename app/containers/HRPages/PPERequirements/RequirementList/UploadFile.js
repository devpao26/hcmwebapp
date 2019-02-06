/**
 * Upload File Component
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* Loading Indicator */
import Loading from 'components/LoadingIndicator/Loading';

const Wrapper = styled.label`
  clear: both;
  display: block;
  cursor: pointer;

  .loading {
    margin: 0 auto;
    width: 35px;
    padding-bottom: 0;
  }
  
  input {
    display: none;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  span {
    color: #838690;

    &:hover {
      color: #2abb9c;
    }
  }
`;

class UploadFile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onChange = (e) => {
    this.setState({
      loading: true,
    });

    this.props.onChange(e, this.props.reqId, this.props.value);
  }

  render() {
    if (this.state.loading) {
      return <Wrapper><Loading /></Wrapper>;
    }

    return (
      <Wrapper>
        <input type="file" multiple onChange={this.onChange} accept={this.props.fileTypes} />
        <span>Click here to upload file(s)</span>
      </Wrapper>
    );
  }
}

UploadFile.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  fileTypes: PropTypes.string.isRequired,
  reqId: PropTypes.string,
};

export default UploadFile;
