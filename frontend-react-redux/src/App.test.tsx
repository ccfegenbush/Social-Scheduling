import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FriendRequestComponent } from './components/friends/view-friend-request.component';
import { InterestsFormComponent } from './components/interests/interests-form.component';
import { AddFriendComponent } from './components/friends/add-friends.component';
import { InvitationComponent } from './components/events/view-event-invitations.component';
import {shallow} from 'enzyme';
import { ViewFriendProfile } from './components/friends/view-friends-profile.component';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FriendRequestComponent />, div);
  ReactDOM.render(<InterestsFormComponent />, div);
  ReactDOM.render(<AddFriendComponent />, div);
  ReactDOM.render(<InvitationComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<ViewFriendProfile />);
});




