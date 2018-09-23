import * as React from 'react';
import {shallow} from 'enzyme';
import { EditInterestsComponent } from './edit-interests.component';

describe('InterestsFormComponent', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<EditInterestsComponent />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('should render a <option />', () => {
    expect(wrapper.find('option').length).toEqual(8);
  });
  
  
  it('should render  <select />', () => {
    expect(wrapper.find('select').length).toEqual(1);
  });
});