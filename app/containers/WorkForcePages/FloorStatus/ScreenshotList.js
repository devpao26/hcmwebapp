/**
 * Shift Summary List
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Img from 'components/Img';
import Status from 'components/User/Status';
import Loading from 'components/LoadingIndicator/Loading';
import Screenshots from './Screenshots';
import Transparent from 'images/transparent.png';

class ScreenshotList extends React.PureComponent {
  setImgPath = (e, path) => {
    this.props.imgPath(path);
  }

  render() {
    const { loading, error, screenShots } = this.props;

    let screenShotsList;

    if (loading) {
      return <Screenshots><Loading /></Screenshots>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <Screenshots><div className="no-data">No Record(s) Found.</div></Screenshots>;
      }
      return <Screenshots><div className="no-data">There was a problem communicating with the server. Please try again later.</div></Screenshots>;
    }

    if (screenShots !== false) {
      if (screenShots) {
        screenShotsList = screenShots.map((item) => (
          <article key={item.ScreenShotID}>
            <div className="screen">
              <div className="img" style={{ backgroundImage: `url(${item.Path})` }}>
                <span role="presentation" className="fa fa-search-plus" onClick={(e) => { this.setImgPath(e, item.Path); }} />
              </div>
            </div>
            { (this.props.display === 'list')
              ? <div className="detail">
                <h4>
                  {/* <span>Rendered Time: 4mins 23seconds</span> */}
                  <span>Status: Automatic Screenshot</span>
                </h4>
                <p>
                  <span>Timestamp: {item.ScreenDateTime}</span>
                  {/* <span>Current Active App: Google Chrome | Tab URL: https://outlook.office365.com</span> */}
                </p>
              </div>
              : <div className="link">
                <button onClick={(e) => { this.setImgPath(e, item.Path); }}>[ VIEW ]</button>
              </div>
            }
          </article>
        ));
      }
      return (
        <Screenshots className={this.props.display}>
          {screenShotsList}
        </Screenshots>
      );
    }

    return null;
  }
}

ScreenshotList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  screenShots: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  display: PropTypes.string,
  imgPath: PropTypes.func,
};

export default ScreenshotList;
