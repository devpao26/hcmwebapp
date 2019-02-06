
import { fromJS } from 'immutable';
import employeeProfileReducer from '../reducer';

describe('employeeProfileReducer', () => {
  it('returns the initial state', () => {
    expect(employeeProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
