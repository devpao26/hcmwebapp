/**
 * History Component
 * @prop {boolean}  isGroup   This will distinguish if we are viewing an employee or a group (dept, workgroup)
 */
import React from 'react';
import PropTypes from 'prop-types';

import SearchFilter from 'components/SearchFilter';
import Wrapper from 'components/Configurations/History';
import Lists from 'components/Configurations/Lists';
import EMPLists from 'components/Employee/SmallEMPList';
import Avatar from 'components/Img/Avatar';

export class HistoryComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        { (this.props.isGroup) &&
          <div className="analytics">
            <dl className="head">
              <dt>Analytics</dt>
              <dd>Total</dd>
            </dl>
            <dl>
              <dt>Approved</dt>
              <dd>12</dd>
            </dl>
            <dl>
              <dt>Disapproved</dt>
              <dd>15</dd>
            </dl>
          </div>
        }
        { (this.props.isGroup) &&
          <div className="listings">
            <SearchFilter search onClick={(val) => { console.log(val); }} placeholder="Search Employees..." formRef={(el) => { this.searchEmpForm = el; }} />
            <EMPLists>
              <dl role="presentation">
                <dt>
                  <Avatar />
                </dt>
                <dd>
                  <p>
                    Last Name, First Name
                    <span>me@email.com</span>
                  </p>
                </dd>
              </dl>
              <dl role="presentation">
                <dt>
                  <Avatar />
                </dt>
                <dd>
                  <p>
                    Last Name, First Name
                    <span>me@email.com</span>
                  </p>
                </dd>
              </dl>
            </EMPLists>
          </div>
        }
        <div className="history">
          <div className="dates">
            <p>DATES</p>
            <Lists>
              <li>Thursday, June 1, 2018</li>
              <li>Thursday, June 1, 2018</li>
            </Lists>
          </div>
          <div className="step-status">
            <dl className="head">
              <dt>STEPS</dt>
              <dd>STATUS</dd>
            </dl>
            <dl>
              <dt>1</dt>
              <dd>Approved</dd>
            </dl>
            <dl>
              <dt>1</dt>
              <dd>Approved</dd>
            </dl>
            <div className="note">
              <p>NOTES:</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

HistoryComponent.propTypes = {
  isGroup: PropTypes.bool,
};

export default HistoryComponent;
