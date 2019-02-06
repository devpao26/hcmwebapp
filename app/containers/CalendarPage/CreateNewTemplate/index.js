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
import Input from 'components/Input';
import Button from 'components/Button';
// import ButtonActionsWrapper from 'components/Button/ButtonActionsWrapper';
import Modal from 'components/Modal';

/* Calendar */
import CalendarWrapper from '../CalendarWrapper';
import Calendar from 'components/Calendar';

/* Template Page Component */
import Left from 'components/Templates/Left';
import Right from 'components/Templates/Right';

/* Section Component */
import H2 from 'components/Section/H2';
import Back from 'components/Section/Back';
import Flex from 'components/SectionFlex';

/* OptionMenu Components */
import OptionMenuWrapper from 'components/OptionMenu/OptionMenuWrapper';
import OptionMenu from 'components/OptionMenu';

/* Own Components */
import RequestForm from './RequestForm';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment().add(3, 'days'),
      TimeZoneText: 'Hong Kong Time UTC +8',
      TimeZoneOption: false,
      PublicHolidayOption: false,
      newHoliday: false,
      showInputError: false,
      renameText: '',
      PublicHolidayText: '',
      newDate: new Date(),
      displayDate: moment().startOf('days')
    };
  }
  addNewHoliday = (date) => {
    this.setState({ 
       newDate: date
    });
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
            <Flex>
              <Left>
                <CalendarWrapper>
                    <H2>Calendar</H2>
                    <Calendar 
                      onClick={this.addNewHoliday}
                      value={this.state.date}
                      displayDate={this.state.displayDate}
                    />    
                </CalendarWrapper>
                <Back to="/calendar">BACK TO CALENDAR TEMPLATE LIST</Back>                         
              </Left>
              <Right>
                <RequestForm>
                  <H2>New Template</H2>
                  <fieldset>
                    <label>Name</label>
                      <input className="new-name" type="text" placeholder="New Template Name" />
                  </fieldset>  
                  <fieldset>
                    <label>Time Zone</label>
                    <div className="time-zone">
                      <span>{this.state.TimeZoneText}</span>
                      <OptionMenuWrapper>
                        <button className="fa fa-caret-down" disabled></button>
                        { this.state.TimeZoneOption && 
                          <OptionMenu title="Time Zone" position="left">
                            
                          </OptionMenu>
                        }
                      </OptionMenuWrapper>
                    </div>
                  </fieldset>   
                  <fieldset>
                    <label>Holidays
                        <button className="btn-holidays fa fa-plus" onClick={this.showNewHoliday}></button>
                    </label>
                  </fieldset>
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      January 1
                    </span>
                    <span className="rightTemplate">
                      New Year's Day
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div>  
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      April 13
                    </span>
                    <span className="rightTemplate">
                      Maundy Thursday
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div> 
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      April 14
                    </span>
                    <span className="rightTemplate">
                      Good Friday
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div> 
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      May 01
                    </span>
                    <span className="rightTemplate">
                      Labor Day
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div> 
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      June 12
                    </span>
                    <span className="rightTemplate">
                      Independence Day
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div> 
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      June 26
                    </span>
                    <span className="rightTemplate">
                      Eid'l Fitr
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div>                                                             
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      August 21
                    </span>
                    <span className="rightTemplate">
                      Ninoy Aquino Day
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div> 
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      August 28
                    </span>
                    <span className="rightTemplate">
                      National Heroes Day
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div>                     
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      October 31
                    </span>
                    <span className="rightTemplate">
                      Halloween
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div>                                        
                  <div className="templateName"> 
                    <span className="leftTemplate">
                      <button disabled><i className="fa fa-circle" aria-hidden="true"></i></button>
                      December 25
                    </span>
                    <span className="rightTemplate">
                      New Years Day
                      <button disabled><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                    </span>
                  </div>      
                  <ButtonActionsWrapper>
                      <Button handleRoute={ () => {} } color="gray">SAVE</Button>
                      <Button handleRoute={ () => {} } color="red">CANCEL</Button>
                  </ButtonActionsWrapper>                    
                </RequestForm>
              </Right>   
            </Flex> 
          </PageContent>
        </Main>
        <Footer />
        <Modal
          show={this.state.newHoliday}
          onClose={this.showNewHoliday}
          showCloseBtn
          title="New Holiday"
          position="left">
          <RequestForm>
            <fieldset>
              <label className="head">Name</label>
              <input className="fields" type="text" placeholder="New Holiday Name" />
            </fieldset>
            <fieldset>
              <label className="head">Type</label>
              <input className="fields" type="text" placeholder="Public Holiday" />
              <span className="dropdown">
                <button className="fa fa-caret-down" disabled></button>    
              </span>
            </fieldset>  
            <fieldset>
              <div className="time-half">
                  <label className="head">Month</label>
                  <input className="fields" type="text" value="December" disabled/>
                  <span className="dropdown">
                      <button className="fa fa-caret-down" disabled></button>    
                  </span>
              </div>
              <div className="time-half">
                  <label className="head">Day</label>
                  <input className="fields" type="text" value="1" disabled/>
                  <span className="dropdown">
                      <button className="fa fa-caret-down" disabled></button>    
                  </span>
              </div>
            </fieldset>
            <ButtonActionsWrapper>
              <Button handleRoute={ () => {} } color="gray">SAVE</Button>
              <Button handleRoute={ () => {} } color="red">CANCEL</Button>
            </ButtonActionsWrapper>
          </RequestForm>                   
        </Modal>
      </PageWrap>
    );
  }
}
