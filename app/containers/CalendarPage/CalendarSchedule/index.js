/*
 * Calendar Templates Creation
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'components/datepicker.css';


/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Search from 'components/SearchFilter';
import Input from 'components/Input';
import EMPList from 'components/Employee/SmallEMPList';
import Avatar from 'components/Img/Avatar';
import Button from 'components/Button';
// import ButtonActionsWrapper from 'components/Button/ButtonActionsWrapper';
import Modal from 'components/Modal';

/* Calendar */
import CalendarWrapper from 'containers/CalendarPage/CalendarWrapper';
import Calendar from 'components/Calendar';


/* Section Component */
import H2 from 'components/Section/H2';
import Flex from 'components/SectionFlex';

/* OptionMenu Components */
import OptionMenuWrapper from 'components/OptionMenu/OptionMenuWrapper';
import OptionMenu from 'components/OptionMenu';

/* Own Components */
import RequestForm from './RequestForm';
import CalendarTimeZone from './CalendarTimeZone';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment(),
      TimeZoneOption: false,
      PublicHolidayOption: false,
      newHoliday: false,
      showInputError: false,
      schedTypeOption: false,
      addEmployeeList: false,

      renameText: '',
      PublicHolidayText: '',
      schedTypeText: '',

    };
  }
  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    });
  }
  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    });
  }
 showNewHoliday = (e) => {
   e.preventDefault();
    this.setState({
       newHoliday: !this.state.newHoliday
    });
  } 
  changeSchedType = (e) => {
    e.preventDefault();
    var schedType = e.target.getAttribute('data-title');
    this.setState({
      schedTypeText: schedType,
      schedTypeOption: false
    });
  }
  showSchedType = (e) => {
    e.preventDefault();
    this.setState({
      schedTypeOption: !this.state.schedTypeOption
    });
  } 
  showAddEmployeeList = (e) => {
    e.preventDefault();
    this.setState({
      addEmployeeList: !this.state.addEmployeeList
    });
  }
  onBlur = (e) => {
    var value = e.target.value;
    if (value != '') {
      this.setState({
        showInputError: false,
        inputValue: e.target.value
      });
    }
  }        
render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Create New Template</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
              {/* <Flex>
                <Left>
                    <CalendarTimeZone>
                        <p>14 : 58 : 05</p>
                        7-11-2017 | UTC+8
                    </CalendarTimeZone>
                    <CalendarWrapper>
                        <H2>Calendar</H2>
                        <Calendar />    
                    </CalendarWrapper>                              
                </Left>
                <Right>
                  <RequestForm>
                    <fieldset>
                      <label>Subject</label>
                      <input  type="text" placeholder="Invitation" />
                    </fieldset>        
                    <fieldset>
                      <label>Date</label>
                        <DatePicker
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        dateFormat="LL"
                        />
                        <span className="dropdown">9:30AM to 10AM<button className="fa fa-caret-down" disabled></button></span>
                    </fieldset>  
                    <fieldset>
                      <label>Duration</label>
                      <input type="text" placeholder="00:30:00" />
                    </fieldset> 
                    <fieldset>
                      <label>Timezone</label>
                      <input  type="text" value="Hong kong Time UTC +8" disabled/>
                      <span className="dropdown"><button className="fa fa-caret-down" disabled></button></span>
                    </fieldset>   
                    <fieldset>
                      <label>Schedule Type</label>
                      <div className="sched-type">
                        <span>{this.state.schedTypeText}</span>
                        <OptionMenu title="Schedule Type" position="left">
                          <button data-title="Meeting" onClick={this.changeSchedType}>Meeting</button>
                          <button data-title="Payroll" onClick={this.changeSchedType}>Payroll</button>
                          <button data-title="Recruitment" onClick={this.changeSchedType}>Recruitment</button>
                          <button data-title="Off-site" onClick={this.changeSchedType}>Off-site</button>
                          <button data-title="Training" onClick={this.changeSchedType}>Training</button>
                        </OptionMenu>
                      </div>
                    </fieldset> 
                    <fieldset>
                      <label>Additional Notes</label>
                      <input  type="text" placeholder="Sample Notes"/>
                      <span className="dropdown"><button className="fa fa-caret-down" disabled></button></span>
                    </fieldset> 
                    <fieldset>
                      <label>Recipients</label>
                        <EMPList>
                            <h3>To</h3>
                            <div className="bgCont">
                              <dl>
                              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                              <dd>
                                  <p>Tony Stark <button className="fa fa-close" disabled></button></p>
                              </dd>
                              </dl>   
                               
                            </div> 
                            <button onClick={this.showAddEmployeeList} className="fa fa-plus addRecipient"></button>
                            <hr/>
                            <h3>CC</h3>
                            <div className="bgCont">
                              <dl>
                              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                              <dd>
                                  <p>Tony Stark <button className="fa fa-close" disabled></button></p>
                              </dd>
                              </dl>      
                            </div>
                            <button onClick={this.showAddEmployeeList} className="fa fa-plus addRecipient"></button>
                            <hr/>
                            <h3>BCC</h3>
                            <div className="bgCont">
                              <dl>
                              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                              <dd>
                                  <p>Tony Stark <button className="fa fa-close" disabled></button></p>
                              </dd>
                              </dl>      
                            </div>   
                            <button onClick={this.showAddEmployeeList} className="fa fa-plus addRecipient"></button>              
                        </EMPList>
                    </fieldset>   
                     <ButtonActionsWrapper>
                        <Button handleRoute={ () => {} } color="gray">SEND</Button>
                        <Button handleRoute={ () => {} } color="red">CANCEL</Button>
                    </ButtonActionsWrapper>                                                                         
                  </RequestForm>
                </Right>   
              </Flex>    */}
              <Modal
                show={this.state.addEmployeeList}
                onClose={this.showAddEmployeeList}
                showCloseBtn
                title="Employee List"
                width="340px">
                <Search search />
                <EMPList>
                  <dl>
                    <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                    <dd>
                      <p>
                        Tony Stark
                        <span>stark@marvel.com</span>
                      </p>
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </dd>
                  </dl>
                  <dl>
                    <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                    <dd>
                      <p>
                        Tony Stark
                        <span>stark@marvel.com</span>
                      </p>
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </dd>
                  </dl>
                  <dl>
                    <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                    <dd>
                      <p>
                        Tony Stark
                        <span>stark@marvel.com</span>
                      </p>
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </dd>
                  </dl>
                  <dl>
                    <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
                    <dd>
                      <p>
                        Tony Stark
                        <span>stark@marvel.com</span>
                      </p>
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </dd>
                  </dl>                  
                </EMPList>
              </Modal>                                
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}
