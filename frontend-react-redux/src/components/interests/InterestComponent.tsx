import * as React from 'react';
import { environment } from '../../environment';

export class SetInterestsComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            interest: 0,
        }
    }

    public onChange = (e: any) => {
        this.setState({
          interest:  Number(e.target.value)
        });
      }

    public onSubmit = (e: any) => {
        e.preventDefault();
        const i = this.state;
        console.log("current sumbit interest id: " + i);
        const interests = {
            "interest": i.interest,
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
            .then(interestData => {
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
                        onChange={this.onChange}
                        value={u.interest}
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
