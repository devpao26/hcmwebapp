/*
 * WorkGroup Team Display
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Section from 'components/Section';
import H2 from 'components/Section/H2';
import OptionMenu from 'components/OptionMenu';
import Input from 'components/Input';
import Button from 'components/Button';

/* Page Specific Styles */
import WorkGroupWrapper from '../Wrapper';
import Flex from '../Flex';
import Columns from '../Columns';
import Items from '../Items';
import Dialog from 'components/WorkGroup/Dialog';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      createDeptDialog: false,
      successMessage: false,
      showInputError: false
    }
  }

  mobileToggleDisplay = (e) => {
    // get our parent container
    let parent = e.currentTarget.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>WorkGroup</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>WorkGroup</H2>
              <WorkGroupWrapper>
                <Flex>
                  <Columns noBorder head>
                    <Items bgColor="#037c6b">
                      <p>
                        Team Name 1
                        <small>Team</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>
                  </Columns>
                </Flex>
                <Flex>
                  <Columns>
                    <Items bgColor="#826092">
                      <p>
                        Sub Team 1
                        <small>Sub Team</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <Items bgColor="#cd6b3e">
                      <p>
                        Sub Team Category 1
                        <small>Category</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <Items bgColor="#cd6b3e">
                      <p>
                        Sub Team Category 1.2
                        <small>Category</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <button onClick={this.mobileToggleDisplay} className="expander fa fa-caret-down" />
                  </Columns>

                  <Columns>
                    <Items bgColor="#826092">
                      <p>
                        Sub Team 2
                        <small>Sub Team</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <Items bgColor="#cd6b3e">
                      <p>
                        Sub Team Category 2
                        <small>Category</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <button onClick={this.mobileToggleDisplay} className="expander fa fa-caret-down" />
                  </Columns>

                  <Columns>
                    <Items bgColor="#826092">
                      <p>
                        Sub Team 3
                        <small>Sub Team</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <Items bgColor="#cd6b3e">
                      <p>
                        Sub Team Category 3
                        <small>Category</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <button onClick={this.mobileToggleDisplay} className="expander fa fa-caret-down" />
                  </Columns>

                  <Columns>
                    <Items bgColor="#826092">
                      <p>
                        Sub Team 4
                        <small>Sub Team</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <Items bgColor="#cd6b3e">
                      <p>
                        Sub Team Category 4
                        <small>Category</small>
                      </p>
                      <OptionMenu title="Options" position="bottom">
                        <button>Enroll Employee</button>
                        <button>Create Department</button>
                        <button>Add Workgroup</button>
                        <button>Assign Calendar Template</button>
                        <button>Assign Shift Schedule Template</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button>View Employee List</button>
                      </OptionMenu>
                    </Items>

                    <button onClick={this.mobileToggleDisplay} className="expander fa fa-caret-down" />
                  </Columns>
                </Flex>
              </WorkGroupWrapper>
            </Section>
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}
