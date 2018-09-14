import * as React from 'react';
import { environment } from '../../environment';
import { RouteComponentProps } from 'react-router';
import { IUserInterestsState } from '../../reducers';

interface IProps extends RouteComponentProps<{}>, IUserInterestsState {
    updateInterest: (interest: string) => any,
    onSubmit: (interest: any) => any
}

export class SetInterestsComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);

    }

    public interestChange = (e: any) => {
        this.props.updateInterest(e.target.value);

      }

    public onSubmit = (e: any) => {
        e.preventDefault();
        const i = this.props;
        console.log("current sumbit interest id: " + i);
        const interests = {
            "interestId": i.interest,
            // "userID" : i.userId
            // "interest2": i.interest2,
            // "interest3": i.interest3
        }
        fetch(environment.context + 'UserInterests/create', {
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
        const u = this.props;
        return (
            <form style={{ background: '#ADD8E6' }} className="form-signup" onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please fill in the reimbursement information</h1>

                <div className="form-group">
                    <label htmlFor="inputInterest1Type" >Interest 1:</label>
                    <select className="form-control"
                        onChange={this.interestChange}
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
