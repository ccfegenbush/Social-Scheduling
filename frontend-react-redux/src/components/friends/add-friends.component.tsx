import * as React from 'react';
import { environment } from '../../environment';
import * as Autocomplete from 'react-autocomplete';
// import { getStocks, matchStocks } from './data';

export class AddFriendComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            friendName: '',
            userData: [],
            usernames: []
        }
    }

    public componentDidMount() {
        fetch(environment.context + 'users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                for (const x of userData) {
                    this.setState({
                        ...this.state,
                       usernames : [...this.state.usernames, x.username ]
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        
    }

    public onAddFriend = (e: any) => {
        const u = this.state;
        e.preventDefault();
        const user = {
            friendName: u.friendName,
            username: u.username
        }
        fetch(environment.context + 'friends', {
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public matchUserNames(state:any, value:any) {
        return (
          state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 
        );
      }

      public getUsernames() {
// console.log(this.state.usernames)
        // const names= []
        // const usernamesFormat = {}
        // const allUsers = this.state.usernames

        // for (const x of allUsers){
        //     const item = allUsers[x]
        //     usernames.push({
        //         "name": item
        //     })
        // }
        //    const usernames = JSON.parse(this.state.usernames)
        //    console.log(usernames)
        //    return   usernames     
        return [
            {  name: 'dan' },
            { name: 'danny' },
            {  name: 'josh' },
            {  name: 'joshh' },
            {  name: 'dannnnnnnnnnnn' },
            {  name: 'dannnnnn' },
            {  name: 'test' },
            {  name: 'danm' },
            {  name: 'test2' },
            {  name: 'test3' },
            {  name: 'dannnnnn' },
            {  name: 'jrod' },
            {  name: 'seitzjoshua' },
          ];
    }

    public render() {
        console.log(this.state.usernames)
        return (
            <div style={{ marginTop: 40, marginLeft: 50 }}>
                <Autocomplete
                    value={this.state.value}
                    inputProps={{ id: 'states-autocomplete' }}
                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                    items={this.getUsernames()}
                    getItemValue={item => item.name}
                    shouldItemRender={this.matchUserNames}
                    onChange={(event, value) => this.setState({ value })}
                    onSelect={value => this.setState({ value })}
                    renderMenu={children => (
                        <div className="menu">
                            {children}
                        </div>
                    )}
                    renderItem={(item, isHighlighted) => (
                        <div
                            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                            key={item.abbr} >
                            {item.name}
                        </div>
                    )}
                />
            </div>
        );
    }
}