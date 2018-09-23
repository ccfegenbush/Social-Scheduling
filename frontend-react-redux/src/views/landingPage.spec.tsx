import * as React from 'react';
import {shallow} from 'enzyme';
import { LandingPage } from './landingPage';

describe('InterestsFormComponent', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });

  it('should render a <masthead />', () => {
    expect(wrapper.find('Masthead').length).toEqual(0);
  });

});