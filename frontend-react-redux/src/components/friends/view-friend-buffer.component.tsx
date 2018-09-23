import * as React from 'react';
import { RouteComponentProps } from 'react-router';
interface IProps extends RouteComponentProps<{}> {
    friendsUsername: string
}

export class BufferViewProfile extends React.Component<IProps, any>  {

    constructor(props: any) {
        super(props);

    }
    public componentDidMount() {
        localStorage.setItem('friendName', JSON.stringify(this.props.friendsUsername));
    }

    public render() {
        return (
        //     <BrowserRouter>
        //     <Route 
        //       path='/friends-profile'
        //       render={ props => <ViewFriendProfile {...this.props.friendsUsername} />}
        //     />
        //   </BrowserRouter>
        <div>loading</div>
        )
    }
}
