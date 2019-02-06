/**
 * Template List
 * @prop {string}   groupName   Name of the group we are viewing
 * @prop {boolean}  isTeam      Check if we are going to assign on team or dept
 * @prop {string}   assignToID  ID to assign the template
 * @prop {string}   templateCat Name of the template we are listing
 * @prop {function} cancel      Function to cancel the modal
 * @prop {string}   assignTo    Name of the template to be assigned to
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';
import SendLoading from 'components/LoadingIndicator';
import Pagination from 'components/Pagination';
import EMPList from 'components/Employee/SmallEMPList';
import Search from 'components/SearchFilter';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';

import Wrapper from './EmpWrapper';

import { makeSelectLoading, makeSelectData, makeSelectError, makeSelectPageDetails } from './selectors';
import { getTemplates, getTemplatesNoReset } from './actions';

export class TemplateListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTeam: this.props.isTeam,
      assignTo: this.props.assignTo,
      assignToID: this.props.assignToID,
      templateID: false,
      templateName: '',
      tempName: this.props.templateCat,
      pageIndex: 1,
      searchVal: false,
    };
  }

  componentDidMount() {
    // Retrieve Template List
    this.props.retrieveTemplateList(1, false, this.state.tempName);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      pageIndex: page,
    });
    this.props.retrieveTemplateListNoReset(page, this.state.searchVal, this.state.tempName);
  }

  searchList = (val) => {
    this.setState({
      searchVal: val,
    });
    this.props.retrieveTemplateListNoReset(1, val, this.state.tempName);
  }

  selectTemplate = (e, id, templateName) => {
    e.preventDefault();

    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        if (childEl[i].classList.contains('active')) { // eslint-disable-line no-lonely-if
          childEl[i].classList.remove('active');
          this.setState({
            templateName: false,
            templateID: false,
          });
        } else {
          childEl[i].classList.add('active');
          this.setState({
            templateName,
            templateID: id,
          });
        }
      }
    }
  }

  assignTemplate = (e) => {
    e.preventDefault();
    let assignTo;
    if (this.state.assignTo === 'Emp') {
      assignTo = 'Emp';
    } else {
      assignTo = (this.state.isTeam) ? 'Team' : 'Dept';
    }
    this.props.assign(e, this.state.templateID, assignTo, this.state.templateName);
    // this.props.assignTemplate(this.state.templateID, this.state.assignToID, assignTo, this.state.tempName);
  }

  render() {
    const { groupName, loading, error, lists, pages, templateCat } = this.props;
    let items;

    let maxPageIndex = 1;
    if (pages) {
      maxPageIndex = pages.MaxPageIndex;
    }

    if (loading) {
      items = <Loading />;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        items = <dl className="message">No Record(s) Found.</dl>;
      } else {
        items = <dl className="message">Something went wrong, please try again</dl>;
      }
    }

    if (lists) {
      items = lists.map((item) => {
        let id;
        if (templateCat === 'Calendar') id = item.CalendarID;
        if (templateCat === 'Shift') id = item.ShiftTemplateID;
        if (templateCat === 'Payroll') id = item.CutoffTemplateID;
        if (templateCat === 'WorkStat') id = item.WorkStatusTemplateID;
        if (templateCat === 'DeskConfig') id = item.WorkMonitoringTemplateID;

        return (
          <dl role="presentation" key={id} onClick={(e) => { this.selectTemplate(e, id, item.Name); }}>
            <dd>
              <h4>{item.Name}</h4>
            </dd>
            <FontAwesomeIcon icon={faCheckCircle} />
          </dl>
        );
      });
    }

    return (
      <Wrapper>
        {(this.props.assignLoading) && <div className="loading-cont"><SendLoading /></div>}
        <Search search onClick={(val) => { this.searchList(val); }} formRef={(el) => { this.searchForm = el; }} placeholder="Search Templates..." defaultVal={(this.state.searchVal) || ''} />
        <h3>
          <b>{groupName}</b>
        </h3>
        <EMPList>
          {items}
        </EMPList>
        { (pages && maxPageIndex !== 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={maxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.gotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
        <ButtonWrapper>
          {(this.state.templateID)
            ? <Button handleRoute={(e) => { this.assignTemplate(e); }}>Assign Template</Button>
            : <Button deadButton opaque>Assign Template</Button>
          }
          <Button handleRoute={this.props.cancel} color="gray">Cancel</Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

TemplateListComponent.propTypes = {
  // Props from parent
  groupName: PropTypes.string,
  isTeam: PropTypes.bool,
  assignToID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  templateCat: PropTypes.string,
  cancel: PropTypes.func,
  assign: PropTypes.func,
  assignTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  // map state props
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  assignLoading: PropTypes.bool,
  // Function dispatch to props
  retrieveTemplateList: PropTypes.func,
  retrieveTemplateListNoReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('templateList'),
  error: makeSelectError('templateList'),
  lists: makeSelectData('templateList'),
  pages: makeSelectPageDetails('templateList'),
  assignLoading: makeSelectLoading('assignTemplate'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveTemplateList: (page, search, tempName) => dispatch(getTemplates(page, search, tempName)),
    retrieveTemplateListNoReset: (page, search, tempName) => dispatch(getTemplatesNoReset(page, search, tempName)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(TemplateListComponent);
