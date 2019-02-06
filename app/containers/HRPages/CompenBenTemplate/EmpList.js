/**
 * Employee List - to be added in the selected template
 */
import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator/Loading';
import Avatar from 'components/Img/Avatar';
import Lists from 'components/Employee/SmallEMPList';

export class EmpListComp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empID: '',
    };
  }

  selectEmpToAdd = (e, id) => {
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

    this.props.select(id);
  }

  render() {
    const { loading, error, lists } = this.props;

    let items = <Lists><dl className="message">No Record(s) Found.</dl></Lists>;

    if (loading) {
      return <Lists><dl><Loading /></dl></Lists>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <Lists><dl className="message">No Record(s) Found.</dl></Lists>;
      }
    }

    if (lists) {
      items = lists.map((item) => (
        <dl role="presentation" key={item.EmpProfileID} onClick={(e) => { this.selectEmpToAdd(e, item.EmpProfileID); }}>
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
        </dl>
      ));

      return <Lists>{ items }</Lists>;
    }
    return { items };
  }
}

EmpListComp.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  select: PropTypes.func,
};

export default EmpListComp;
