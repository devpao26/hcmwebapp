/**
 * Employee History
 */
import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';
import Collapse from 'components/Employee/EmpCollapsible';

export class EmpHistory extends React.PureComponent {
  render() {
    return (
      <div className="tab-content emp-history">
        <Collapse title="Employment History">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-03-2017</td>
                <td>Signed Job Offer</td>
              </tr>
              <tr>
                <td>01-10-2017</td>
                <td>Start Date</td>
              </tr>
            </tbody>
          </table>
        </Collapse>
        <Collapse title="Leave Request">
          <table>
            <thead>
              <tr>
                <th>Date Requested</th>
                <th>Leave Type</th>
                <th>Leave Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>01-06-2017</td>
                <td>Approved</td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>01-06-2017</td>
                <td>Rejected</td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>01-06-2017</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={3}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={() => {}}
              activeClassName={'active'}
            />
          </Pagination>
        </Collapse>
        <Collapse title="NOPA">
          <table>
            <thead>
              <tr>
                <th>Date Issued</th>
                <th>NOPA Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-03-2017</td>
                <td>NOPA Type</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>NOPA Type</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>NOPA Type</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
            </tbody>
          </table>
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={3}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={() => {}}
              activeClassName={'active'}
            />
          </Pagination>
        </Collapse>
        <Collapse title="Incident Reports">
          <table>
            <thead>
              <tr>
                <th>Date Issued</th>
                <th>IRF Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-03-2017</td>
                <td>IRF Category</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>IRF Category</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>IRF Category</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
            </tbody>
          </table>
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={3}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={() => {}}
              activeClassName={'active'}
            />
          </Pagination>
        </Collapse>
        <Collapse title="Forms Requested">
          <table>
            <thead>
              <tr>
                <th>Date Requested</th>
                <th>Form Name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>Approved</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>Rejected</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>Pending</td>
                <td><a href="/" title="View">view</a></td>
              </tr>
            </tbody>
          </table>
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={3}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={() => {}}
              activeClassName={'active'}
            />
          </Pagination>
        </Collapse>
        <Collapse title="OT">
          <table>
            <thead>
              <tr>
                <th>Date Requested</th>
                <th>Shift Date</th>
                <th>OT Minutes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>100 mins</td>
                <td>Approved</td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>100 mins</td>
                <td>Rejected</td>
              </tr>
              <tr>
                <td>01-03-2017</td>
                <td>Sick Leave</td>
                <td>100 mins</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={3}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={() => {}}
              activeClassName={'active'}
            />
          </Pagination>
        </Collapse>
      </div>
    );
  }
}

EmpHistory.propTypes = {};

export default EmpHistory;
