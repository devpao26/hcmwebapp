import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/**  Global Components **/
import Loading from 'components/LoadingIndicator/Loading';
import Avatar from 'components/Img/Avatar';
import EMPList from 'components/Employee/SmallEMPList';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';

import { makeSelectLoading, makeSelectError, makeSelectObjectList } from '../selector';

class EmpListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployees: [],
      selectedEmpNames: [],
    };
  }
  select = (e, empProfileID, empFirstName, empLastName, empJobRole) => {
    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }
    this.props.selectEmp(empProfileID, empFirstName, empLastName, empJobRole);
  }
  // Select Multiple Employees
  selectMultiEmps = (e, id, name) => {
    e.preventDefault();
    const el = e.currentTarget;
    const { selectedEmployees, selectedEmpNames } = this.state;
    const index = selectedEmployees.indexOf(id);

    if (index === -1) {
      selectedEmpNames.push({ id, name });
      selectedEmployees.push(id);

      for (let i = 0; i < selectedEmployees.length; i += 1) {
        // Add selected class in the element
        el.classList.add('selected');
      }
    } else {
      for (let i = 0; i < selectedEmployees.length; i += 1) {
        // Add selected class in the element
        el.classList.remove('selected');

        if (selectedEmployees[i] === id) {
          selectedEmployees.splice(i, 1);
          selectedEmpNames.splice(i, 1);
        }
      }
    }
    this.props.selectMultipleEmp(selectedEmployees, selectedEmpNames);
  }
  render() {
    const { loading, error, lists, showempvalidation } = this.props;

    let items;

    if (loading) return <span><Loading /></span>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <p className="error-msg">No Record(s) Found.</p>;
      }
      return <p className="error-msg">There is a problem communicating with the server. Please try again later.</p>;
    }

    if (lists) {
      items = lists.map((item) => {
        const empName = `${item.LastName}, ${item.FirstName}`;
        return (
          <dl role="presentation" key={item.EmpProfileID} className="cont" onClick={(showempvalidation === 'singleemps') ? (e) => this.select(e, item.EmpProfileID, item.FirstName, item.LastName, item.JobRole.Name) : (e) => this.selectMultiEmps(e, item.EmpProfileID, empName)}>
            <dt>
              { (item.EmpAvatarAttachs != null)
                  ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                  : <Avatar />
                }
            </dt>
            <dd>
              <p>
                {item.LastName}, {item.FirstName}
                <span>{item.Email}</span>
              </p>
            </dd>
            <FontAwesomeIcon icon={faCheckCircle} />
          </dl>);
      });

      return (
        <EMPList>
          {items}
        </EMPList>
      );
    }
    return null;
  }
}

EmpListComponent.propTypes = {
  selectEmp: PropTypes.func,
  selectMultipleEmp: PropTypes.func,
  loading: PropTypes.bool,
  showempvalidation: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('employeelists'),
  error: makeSelectError('employeelists'),
  lists: makeSelectObjectList('employeelists'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(EmpListComponent);
