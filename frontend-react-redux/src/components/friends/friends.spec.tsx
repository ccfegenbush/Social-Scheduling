import * as React from 'react';
import {shallow} from 'enzyme';
import { FriendComponent } from './view-friends';
import { AddFriendComponent } from './add-friends.component';

describe('view-friends', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<FriendComponent />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(6);
  });

  it('should render a <span />', () => {
    expect(wrapper.find('span').length).toEqual(2);
  });

  it('should render the AddFriendComponent Component', () => {
    expect(wrapper.containsMatchingElement(<AddFriendComponent />)).toEqual(true);
  });
});