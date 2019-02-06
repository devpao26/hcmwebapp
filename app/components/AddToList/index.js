/**
 * Add To List Component
 * @prop {array}  lists       Array of objects to be display
 * @prop {string} listType    List type to be displayed (options below) default: Employee
 * @prop {bool}   isMultiple  Selection is multiple or 1 by 1
 * @prop {func}   addTo       return function for adding on main component
 * @prop {string} groupName   Name of the group where this list is being added
 * This component will display a list to be added on selected features
 * Display will vary depends on the list type props
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle } from '@fortawesome/fontawesome-free-solid';

import Avatar from 'components/Img/Avatar';
import GroupFilter from 'components/Enums/GroupFilter';

import Wrapper from './Wrapper';
import ListWrapper from './ListWrapper';

class AddToListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      single: false,
    };
  }

  enrollSelected = () => {
    // not multiple
    this.props.addTo(this.state.single);
  }

  addToSelection = (e, id) => {
    if (this.props.isMultiple) {
      this.multipleSelect(e, id);
    } else {
      this.singleSelect(e, id);
    }
  }

  multipleSelect = (e, id) => {
    const el = e.currentTarget;
    const { selected } = this.state;
    const index = selected.indexOf(id);

    // Check if the employee ID exists
    if (index === -1) {
      // ID doesn't exist in array, so add it
      this.setState((prevState) => ({
        selected: [...prevState.selected, id],
      }));
      // Add selected class in the element
      el.classList.add('selected');
    } else {
      // ID exists in array, remove it
      const newArray = this.state.selected.filter((item) => item !== id);
      this.setState({
        selected: newArray,
      });
      // Remove selected class in element
      el.classList.remove('selected');
    }
  }

  singleSelect = (e, id) => {
    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('selected');
      } else {
        childEl[i].classList.add('selected');
        this.setState({
          single: id,
        });
      }
    }
  }

  render() {
    const { listType, lists } = this.props;
    let items;

    if (listType === GroupFilter.Employee) {
      items = lists.map((item) => (
        <li role="presentation" onClick={(e) => { this.addToSelection(e, item.EmpProfileID); }} key={item.EmpProfileID}>
          { (item.EmpAvatarAttachs != null)
            ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
            : <Avatar />
          }
          <p>
            {item.LastName}, {item.FirstName}
            <small>{item.Email}</small>
          </p>
          <FontAwesomeIcon icon={faCheckCircle} />
        </li>
      ));
    }

    if (listType === GroupFilter.Workgroup) {
      items = lists.map((item) => (
        <li role="presentation" onClick={(e) => { this.addToSelection(e, item.TeamID); }} key={item.TeamID}>
          <p className="group">
            {item.Name}
          </p>
          <FontAwesomeIcon icon={faCheckCircle} />
        </li>
      ));
    }

    if (listType === GroupFilter.Department) {
      items = lists.map((item) => (
        <li role="presentation" onClick={(e) => { this.addToSelection(e, item.DeptID); }} key={item.DeptID}>
          <p className="group">
            {item.Name}
          </p>
          <FontAwesomeIcon icon={faCheckCircle} />
        </li>
      ));
    }

    return (
      <Wrapper>
        <h3>
          <b>{this.props.groupName}</b>
          {(this.state.selected.length > 0 || this.state.single) && <button className="add-emp" onClick={this.enrollSelected}><FontAwesomeIcon icon={faPlus} /></button>}
          {(this.props.isMultiple) && <span className="total">Total Selected <b>{this.state.selected.length}</b></span>}
        </h3>
        <ListWrapper>
          {items}
        </ListWrapper>
      </Wrapper>
    );
  }
}

AddToListComponent.defaultProps = {
  listType: GroupFilter.Employee,
};

AddToListComponent.propTypes = {
  lists: PropTypes.array,
  listType: PropTypes.string,
  isMultiple: PropTypes.bool,
  addTo: PropTypes.func,
  groupName: PropTypes.string,
};

export default AddToListComponent;
