/**
 * Image Modal Box
 * A component to show enlarge view of image thumbnails
 *
 * Props: show, onClose, imagePath (all are required)
 * Usage: <ImageModal show={true/false} onClose={function} imagePath={string} />
 */

import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

/* Global Component */
import Container from 'components/StyleUtils/Overlay';
import Close from 'components/StyleUtils/Close';

const LargeImage = styled.div`
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 85%;
  max-width: 1063px;
  height: 66%;
  /* padding-bottom: 48.2%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -1px -1px 13.5px 1px rgba(45, 44, 44, 0.52);
  font-size: 14px;

  .fa-close {
    top: -20px;
  }

  .fa-download {
    font-size: 1.5em;
    position: absolute;
    top: -33px;
    right: 25px;
    text-shadow: 0 0 2px #000, 0 0 2px #000, 0 0 2px #000;
    color: #fff;
    padding: 3px 5px 1px;
    border-radius: 2px;
    border: 1px solid #000;
    background-color: rgba(255,255,255,.7);
  }
`;

class ImageModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <Container overlay={this.props.noOverlay}>
        <LargeImage style={{ backgroundImage: `url(${this.props.imagePath})` }}>
          <Close onClick={this.props.onClose} className="fa fa-close" />
          <a href={this.props.imagePath} className="fa fa-download" title="Click to Download">&nbsp;</a>
        </LargeImage>
      </Container>
    );
  }
}

ImageModal.defaultProps = {
  noOverlay: false,
};

ImageModal.propTypes = {
  noOverlay: PropTypes.bool,
  imagePath: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ImageModal;
