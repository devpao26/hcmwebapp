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
import Img from 'components/Img/Avatar';
import OptionMenu from 'components/OptionMenu';
import OptionMenuWrapper from 'components/OptionMenu/OptionMenuWrapper';

/* Section Components */
import Section from 'components/Section';
import H2 from 'components/Section/H2';
import Back from 'components/Section/Back';

import Wrapper from '../Wrapper';
import Flex from '../Flex';
import Item from '../Item';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
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
            <Back to="/org-chart">BACK TO MAIN CHART</Back>
            <Section>
              <H2>Organizational Chart</H2>
              <Wrapper>
                <button onClick={this.mobileExpandWrapper} className="expander fa fa-caret-down" />
                <h3 />
                <Flex>
                  <Item color="blue">
                    <Img />
                    <div>
                      <p className="position">Manager</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                </Flex>
                <Flex>
                  <Item color="green">
                    <Img />
                    <div>
                      <p className="position"><Link to="/org-chart/supervisor">Supervisor</Link></p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="green">
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="green">
                    <Img />
                    <div>
                      <p className="position">Sr. Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item color="green">
                    <Img />
                    <div>
                      <p className="position">Supervisor</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                </Flex>
              </Wrapper>

              <Wrapper>
                <button onClick={this.mobileExpandWrapper} className="expander fa fa-caret-down" />
                <h3 />
                <Flex>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
                        <button>Disable Account</button>
                      </OptionMenu>
                    </div>
                  </Item>
                  <Item>
                    <Img />
                    <div>
                      <p className="position">Officer</p>
                      <p className="name">Zeus Keraunos</p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Transfer</button>
                        <button>View Profile</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>View Employee List</button>
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
      </PageWrap>
    );
  }
}
