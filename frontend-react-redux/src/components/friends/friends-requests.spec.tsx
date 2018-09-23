import * as React from 'react';
import {shallow} from 'enzyme';
import { FriendRequestComponent } from './view-friend-request.component';


describe('view-friends requests', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<FriendRequestComponent />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('should render a <tr/>', () => {
    expect(wrapper.find('tr').length).toEqual(1);
  });

  it('should render  <thead/>', () => {
    expect(wrapper.find('thead').length).toEqual(1);
  });

  it('should render  <tr/>', () => {
    expect(wrapper.find('tr').length).toEqual(1);
  });
});