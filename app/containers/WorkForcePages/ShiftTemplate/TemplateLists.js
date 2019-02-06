/**
 * Shift Template Lists (for Shift Template Page)
 */
import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator/Loading';

class TemplateDataList extends React.PureComponent {
  selectTemplate = (e, id) => {
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

    // Pass our ID on the parent component
    this.props.getTemplateId(id);
  }

  render() {
    const { loading, error, lists, templateIndex } = this.props;

    let items = (<div className="list"><p className="message">No Record(s) Found.</p></div>);

    if (loading) {
      return (
        <div className="list"><Loading /></div>
      );
    }

    if (error !== false) {
      if (error.ErrorCode === 204) {
        return <div className="list"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="list"><p className="message">Something went wrong, please try again</p></div>;
    }

    if (lists !== false) {
      // If we have data, .map it is
      items = lists.map((item, index) =>
        <p role="presentation" key={item.ShiftTemplateID} className={(index === templateIndex) ? 'active list-item' : 'list-item'} onClick={(e) => { this.selectTemplate(e, item.ShiftTemplateID); }}>{item.Name}</p>
      );

      return (
        <div className="list">
          {items}
        </div>
      );
    }

    return null;
  }
}

TemplateDataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  getTemplateId: PropTypes.func.isRequired,
  templateIndex: PropTypes.number,
};

export default TemplateDataList;
