import * as React from 'react';
import {shallow} from 'enzyme';
import { InterestsFormComponent } from './interests-form.component';


describe('ProfileComponent', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<InterestsFormComponent />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('should render a <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
});