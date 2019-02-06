/*
 * Image (Avatar) as SVG
 * Pass prop = bgImage
 *
 * Usage: <Avatar bgImage="url('your-image-url')" />
 */
import React from 'react';
import PropTypes from 'prop-types';

import AvatarWrapper from './AvatarWrapper';

class Avatar extends React.Component {
  render() {

    const fill = this.props.fill || '#fff';
    const bgImage = this.props.bgImage || '';
    const svgDisplay = this.props.bgImage ? 'none' : 'block';

    return (
      <AvatarWrapper className="user-avatar" style={{backgroundImage: bgImage}}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{display: svgDisplay}}>
          <path fill={fill} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </AvatarWrapper>
    )
  }
}

Avatar.propTypes = {
  bgImage: PropTypes.string
};

export default Avatar;
