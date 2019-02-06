/*
 * Calendar Section
 * Choose this option to initialize active state (let bgColor = this.state.bgColor ? "#fffff" : "#fbfcfe")
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Confirm from 'components/ConfirmationDialog';
import Search from 'components/SearchFilter';
import Img from 'components/Header/Img';
import WorkIcon from 'components/ImageFiles/calendar.png';
import EMPList from 'components/Employee/SmallEMPList';
import Avatar from 'components/Img/Avatar';
import Modal from 'components/Modal';

/* Template Page Component */
import Left from 'components/Templates/Left';
import Right from 'components/Templates/Right';
import TemplateHeader from 'components/Templates/Header';
import EnrolledInTemplate from 'components/Templates/EnrolledInTemplate';
import TemplateList from 'components/Templates/TemplateList';

/* Section Component */
import H2 from 'components/Section/H2';
import Flex from 'components/SectionFlex';

/* OptionMenu Components */
import OptionMenu from 'components/OptionMenu';

/* Own Components */
import LocalStyle from './LocalStyle';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      addEmployeeList: false,
      addDepartmentList: false,
      addWorkGroupList: false,
      confirmDelete: false,
      optionMenu: false,
      active: null,
    }
  }

  // Initialize toggle for changing colors
  showActiveSelection = (position) => {
    if (this.state.active === position) {
      this.setState({active : null})
    } else {
      this.setState({active : position})
    }
  }

  // Change color state
  changeActiveColor = (position) =>  {
    if (this.state.active === position) {
      return "#fbfcfe";
    }
     return ""; // default color
  }  
  // Show deletion option on modal
  showDelete = (e) => {
    this.setState({
      confirmDelete: !this.state.confirmDelete,
    });
  }  
  // Show Employees Lists
  showEmployee = (e) => {
    e.preventDefault();
    this.setState ({
      employeeMenu: !this.state.employeeMenu,
    });
  }
  // Show Category for departments
 showAddEmployeeList = (e) => {
    e.preventDefault();
    this.setState({
      addEmployeeList: !this.state.addEmployeeList
    });
  }  
 showAddDepartmentList = (e) => {
    e.preventDefault();
    this.setState({
      addDepartmentList: !this.state.addDepartmentList
    });
  }  
 showAddWorkGroupList = (e) => {
    e.preventDefault();
    this.setState({
      addWorkGroupList: !this.state.addWorkGroupList
    });
  }
render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Calendar</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
          <Flex>
              <Left>
                <H2>Template Overview <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                <TemplateHeader>
                  <div className="template-icon">
                    <Img src={WorkIcon} alt="Work Status Icon"></Img>
                  </div>
                  <div className="template-details">
                    <h3>
                      Template Name 1
                      <button className="fa fa-pencil" />
                      <button className="fa fa-minus" />
                    </h3>
                    <p>Created at: 07-19-2017</p>
                    <p>Created by: Tony Stark</p>
                  </div>
                </TemplateHeader>
                <EnrolledInTemplate>
                  <div className="enrolled-heading">
                    List of Enrolled Users
                    <OptionMenu title="Category" position="right" icon="plus">
                      <button onClick={this.showAddWorkGroupList}>WorkGroup</button>
                      <button onClick={this.showAddDepartmentList}>Department</button>
                      <button onClick={this.showAddEmployeeList}>Employee</button>
                    </OptionMenu>
                  </div>
                  <div className="enrolled-list">
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                  </div>
                </EnrolledInTemplate>                                       
              </Left>
              <Right>
                <H2>Calendar Templates <button className="fa fa-caret-down" /></H2>
                <TemplateList>
                  <div className="create-new">
                    <Link to="/calendar/create-new"><i className="fa fa-plus" /> Create New Template</Link>
                  </div>
                  <div className="list">
                    <p className="list-item">Template Name 1</p>
                    <p className="list-item">Template Name 1</p>
                    <p className="list-item">Template Name 1</p>
                  </div>
                </TemplateList>
              </Right>   
            </Flex>
          </PageContent>
        </Main>
        <Footer />
        <Confirm
          show={this.state.confirmDelete}
          title="REMOVE"
          onClick={() => {alert('yes'); this.setState({confirmDelete:false});}}
          onClose={this.showDelete}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No">
          <p>Are you sure you want to remove <br /> <span className="dept-header">Department Name 1 </span><br /> from this Template</p>
        </Confirm>  
        <Modal
          show={this.state.addEmployeeList}
          onClose={this.showAddEmployeeList}
          showCloseBtn
          title="Employee List"
          width="340px">
          <Search search />
          <EMPList>
            <button className="add-emp"><i className="fa fa-plus" /></button>
            <h3>Department Name 1</h3>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Tony Stark
                  <span>stark@marvel.com</span>
                </p>
              </dd>
            </dl>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Clark Kent
                  <span>clark@marvel.com</span>
                </p>
              </dd>
            </dl>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Peter Parker
                  <span>parker@marvel.com</span>
                </p>
              </dd>
            </dl>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Barry Allen
                  <span>barry@marvel.com</span>
                </p>
              </dd>
            </dl>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Bruce Wayne
                  <span>wayne@dc.com</span>
                </p>
              </dd>
            </dl>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Daisy Johnson
                  <span>johnson@shield.com</span>
                </p>
              </dd>
            </dl>                                                                
          </EMPList>
        </Modal>   
        <Modal
          show={this.state.addDepartmentList}
          onClose={this.showAddDepartmentList}
          showCloseBtn
          title="Department List"
          width="340px">
          <Search search />
          <EMPList>
            <button className="add-emp"><i className="fa fa-plus" /></button>
            <dl>
              <dd>
                <p>
                  Department Name 1
                </p>
              </dd>
            </dl>
            <dl>
              <dd>
                <p>
                  Department Name 2
                </p>
              </dd>
            </dl>
            <dl>
              <dd>
                <p>
                  Department Name 3
                </p>
              </dd>
            </dl> 
            <dl>
              <dd>
                <p>
                  Department Name 4
                </p>
              </dd>
            </dl> 
            <dl>
              <dd>
                <p>
                  Department Name 5
                </p>
              </dd>
            </dl> 
            <dl>
              <dd>
                <p>
                  Department Name 6
                </p>
              </dd>
            </dl>
          </EMPList>
        </Modal>
        <Modal
          show={this.state.addWorkGroupList}
          onClose={this.showAddWorkGroupList}
          showCloseBtn
          title="Workgroup List"
          width="340px">
          <Search search />
          <EMPList>
            <button className="add-emp"><i className="fa fa-plus" /></button>
            <dl>
              <dd>
                <p>
                  Workgroup Name 1
                </p>
              </dd>
            </dl>
            <dl>
              <dd>
                <p>
                  Workgroup Name 2
                </p>
              </dd>
            </dl>
            <dl>
              <dd>
                <p>
                  Workgroup Name 3
                </p>
              </dd>
            </dl> 
            <dl>
              <dd>
                <p>
                  Workgroup Name 4
                </p>
              </dd>
            </dl> 
            <dl>
              <dd>
                <p>
                  Workgroup Name 5
                </p>
              </dd>
            </dl> 
            <dl>
              <dd>
                <p>
                  Workgroup Name 6
                </p>
              </dd>
            </dl>
          </EMPList>
        </Modal>
      </PageWrap>
    );
  }
}
