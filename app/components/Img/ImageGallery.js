/**
 * Image Gallery Component
 * 
 * This will display an image gallery whether in modal view or inline view in page.
 * 
 * Usage:
 * Props:
 */
import React from 'react';
import PropTypes from 'prop-types';

export class ImageGallery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div></div>
    )
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  imageIndex: PropTypes.number,
  onClose: PropTypes.func,
  show: PropTypes.bool,
}

ImageGallery.defaultProps = {
  show: false,
  imageIndex: 0,
}

export default ImageGallery;