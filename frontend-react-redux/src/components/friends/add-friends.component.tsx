import * as React from 'react';
import { environment } from '../../environment';
import * as Autocomplete  from  'react-autocomplete';
import { getStocks, matchStocks } from './data';

export class AddFriendComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            friendName: '',
            username: ''
        }
    }

    public onChange = (e: any) => {
        console.log(this.state)
        this.setState({ [e.target.name]: e.target.value })
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
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public onSubmit = (e: any) => {
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
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(userData => {
                this.props.history.push('/home');
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

    public render() {
        // const u = this.state;
        return (
            <div style = {{ marginTop: 40, marginLeft: 50 }}>
        <Autocomplete
          value={ this.state.value }
          inputProps={{ id: 'states-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={ getStocks() }
          getItemValue={ item => item.name }
          shouldItemRender={ matchStocks }
          onChange={(event, value) => this.setState({ value }) }
          onSelect={ value => this.setState({ value }) }
          renderMenu={ children => (
            <div className = "menu">
              { children }
            </div>
          )}
          renderItem={ (item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={ item.abbr } >
              { item.name }
            </div>
          )}
        />
      </div>
      );

        //     <div style = {{ marginTop: 40, marginLeft: 50 }}>
        //     <Autocomplete
        //       value={ this.state.value }
        //       inputProps={{ id: 'states-autocomplete' }}
        //       wrapperStyle={{ position: 'relative', display: 'inline-block' }}
        //       items={ getStocks() }
        //       getItemValue={ item => item.name }
        //       shouldItemRender={ matchStocks }
        //       onChange={(event, value) => this.setState({ value }) }
        //       onSelect={ value => this.setState({ value }) }
        //       renderMenu={ children => (
        //         <div className = "menu">
        //           { children }
        //         </div>
        //       )}
        //       renderItem={ (item, isHighlighted) => (
        //         <div
        //           className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        //           key={ item.abbr } >
        //           { item.name }
        //         </div>
        //       )}
        //     />
        //   </div>
        //   );
        // )
       
    }
}