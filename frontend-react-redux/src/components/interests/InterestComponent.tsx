import * as React from 'react';
import { environment } from '../../environment';

export class SetInterestsComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            interest1: '',
            // interest2: '',
            // interest3: ''
        }
    }
    public onReimbTypeSet = (e: any) => {
    
        this.setState({
          interest1: e.target.value
        //   credentials: {
        //     ...this.state.inters,
        //     reimbType: e.target.value
        //   }
        });
        console.log(this.state)
      }

    public onSubmit = (e: any) => {
        const i = this.state;
        e.preventDefault();
        const interests = {
            "interest1": i.interest1,
            // "interest2": i.interest2,
            // "interest3": i.interest3
        }
        fetch(environment.context + 'interests/create', {
            body: JSON.stringify(interests),
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
        const u = this.state;
        return (
            <form style={{ background: '#ADD8E6' }} className="form-signup" onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please fill in the reimbursement information</h1>

                <div className="form-group">
                    <label htmlFor="inputInterest1Type" >Interest 1:</label>
                    <select className="form-control"
                        id="sel1"
                        onChange={this.onReimbTypeSet}
                        value={u.interest1}
                        placeholder="Interest Type 1"
                        required 
                    >
                        <option value="1">Sports</option>
                        <option value="2">Movies</option>
                        <option value="3">Shopping</option>
                        <option value="5">Beach</option>
                        <option value="6">Traveling</option>
                        <option value="7">Gaming</option>
                    </select>
                </div>

                <button className="btn btn-lg btn-primary btn-block" type="submit" value="Add Node server">Sign in</button>
                {/* {errorMessage && <p id="error-message">{errorMessage}</p>} */}
            </form>
        )
    }
}
