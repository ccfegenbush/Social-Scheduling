import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
// import signInComponent from './components/sign-in/sign-in.component';
import { InterestsFormComponent } from './components/interests/interests-form.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  let wrapper : any
  beforeEach(() => {
  wrapper = shallow(<App />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Interest Component', () => {
    expect(wrapper.containsMatchingElement(<InterestsFormComponent/>)).toEqual(true);
  });
});
