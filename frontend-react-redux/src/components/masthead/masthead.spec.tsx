import * as React from 'react';
import {shallow} from 'enzyme';
import { Masthead } from './masthead.component';

describe('InterestsFormComponent', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Masthead />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('should render a <header />', () => {
    expect(wrapper.find('header').length).toEqual(1);
  });

  
});