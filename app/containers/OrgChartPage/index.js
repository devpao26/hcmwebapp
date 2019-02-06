/*
 * Organizational Chart
 *
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
import Avatar from 'components/Img/Avatar';
import EMPList from 'components/Employee/SmallEMPList';
import Dialog from 'components/Modal';
import OptionMenu from 'components/OptionMenu';
import Img from 'components/Img/Avatar';

/* Section Components */
import Section from 'components/Section';
import H2 from 'components/Section/H2';

import Wrapper from './Wrapper';
import Flex from './Flex';
import Item from './Item';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      employeeList: false,
    }
  }

  showEmployeeList = () => {
    this.setState({
      employeeList: !this.state.employeeList
    });
  }

  mobileExpandWrapper = (e) => {
    let wrapper = e.target.parentNode;
    wrapper.classList.toggle('expand');
  }

  componentDidMount() {
    let mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');
  }

  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Organizational Chart</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>Organizational Chart</H2>
              <Wrapper>
                <button onClick={this.mobileExpandWrapper} className="expander fa fa-caret-down" />
                <h3>Executive Committee</h3>
                <Flex>
                  <Item color="black">
                    <Img bgImage="url('https://unsplash.it/300')" />
                    <div>
                      <p className="name">President</p>
                      <p className="position">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                </Flex>
                <Flex>
                  <Item color="black">
                    <Img />
                    <div>
                      <p className="name">Vice President</p>
                      <p className="position">Apollon Agana Belea</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="black">
                    <Img />
                    <div>
                      <p className="name">Excom</p>
                      <p className="position">Akira Totsuka</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="black">
                    <Img />
                    <div>
                      <p className="name">Excom</p>
                      <p className="position">Akira Totsuka</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="black">
                    <Img />
                    <div>
                      <p className="name">Excom</p>
                      <p className="position">Akira Totsuka</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                </Flex>
              </Wrapper>

              <Wrapper>
                <button onClick={this.mobileExpandWrapper} className="expander fa fa-caret-down" />
                <h3>Management Committee</h3>
                <Flex>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="name">Operations Department</p>
                      <p className="position">Paolo Trio</p>
                      <OptionMenu title="Options" position="bottom">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button onClick={this.showEmployeeList}>View Employee List</button>
                          <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                </Flex>
              </Wrapper>
            </Section>
          </PageContent>
        </Main>
        <Footer />

        <Dialog
          show={this.state.employeeList}
          onClose={this.showEmployeeList}
          showCloseBtn
          title="Employee List"
          width="350px">
          <EMPList>
            <h3>Team Name Employee List</h3>
            <dl>
              <dt><Avatar bgImage="url('https://unsplash.it/100')" /></dt>
              <dd>
                <p>
                  Tony Stark
                  <span>stark@marvel.com</span>
                </p>
                <OptionMenu title="Options" position="right">
                  <button>Transfer</button>
                  <button>View Profile</button>
                  <button>Assign Calendar Template</button>
                  <button>Assign Shift Schedule Template</button>
                  <button data-user="Tony Stark" onClick={this.showDisable}>Disable Account</button>
                </OptionMenu>
              </dd>
            </dl>
          </EMPList>
        </Dialog>
      </PageWrap>
    );
  }
}
