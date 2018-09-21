import * as React from "react";
import { environment } from "../../environment";



export class InviteToEvent extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
            eventData: [],
            eventIds: []
        }
    }

    public componentDidMount(){
        fetch(environment.context + 'events', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(eventData => {
                for(const x of eventData){
                    this.setState({
                        ...this.state,
                        eventIds: [...this.state.eventIds, x.eventIds]
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // public onInviteToEvent = (e : any) => {
    //     const eventIds = this.state.value;
    //     const userId = JSON.parse(localStorage.getItem('userId') || '{}');
    //     e.preventDefault();
    // }
    public matchUserNames(state:any, value:any) {
        return (
          state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 
        );
      }

    public getUsernames() {
        const allUsers = this.state.usernames
        const usernameObjs = allUsers.map((username:any) => ({name: username}));
        return usernameObjs
    }
    public render(){
        return(

            <div>
                <p>Hello</p>
                {/* <div style={{ marginTop: 40, marginLeft: 50 }}>
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
                <button onClick = {this.onInviteToEvent}> Invite Friend!</button>
            </div> */}
            </div>

        );
    }

}