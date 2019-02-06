/**
 * Work Status Template Lists
 */
import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator/Loading';

class TemplateDataList extends React.PureComponent {
  selectTemplate = (e, id) => {
    // get all element in the list
    let childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    let targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (var i = 0; i < childEl.length; i++) { 
      if ( targetEl != childEl[i] ) { 
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

    let header,
        items = (<div className="list"><p className="message">No Record(s) Found.</p></div>),
        optionMenus;

    if (loading) {
      return (
        <div className="list"><Loading /></div>
      )
    }

    if (error !== false) {
      if (error.ErrorCode === 204) {
        return <div className="list"><p className="message">No Record(s) Found.</p></div>  
      }
      return <div className="list"><p className="message">Something went wrong, please try again</p></div>
    }

    if (lists !== false) {
      // If we have data, .map it is
      items = lists.map((item, index) =>
        <p key={item.WorkStatusTemplateID} className={(index === templateIndex) ? "active list-item": 'list-item'} onClick={(e) => {this.selectTemplate(e, item.WorkStatusTemplateID)}}>{item.Name}</p>
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
    PropTypes.array
  ]),
  getTemplateId: PropTypes.func.isRequired,
  templateIndex: PropTypes.number
};

export default TemplateDataList;
