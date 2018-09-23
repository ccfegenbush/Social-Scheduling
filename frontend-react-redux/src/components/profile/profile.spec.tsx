import * as React from 'react';
import {shallow} from 'enzyme';
import { ProfileComponent } from './profile.component';

describe('InterestsFormComponent', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<ProfileComponent />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(7);
  });

  it('should render a <section />', () => {
    expect(wrapper.find('section').length).toEqual(1);
  });
  
});