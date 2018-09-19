import * as React from 'react';
import { environment } from '../../../environment';

export class EditInterestsComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            interests: [''],
        }
    }

    public componentDidMount() {
        fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/interests`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(resp => resp.json())
        .then(userInterests => {
            console.log(userInterests)
            this.setState({interests: userInterests});
        })
    }

    public addInterest = (e:any) => {
        e.preventDefault();
        this.setState((prevState: any) => ({
            interests: [...prevState.interests, ''],
        }));
    }

    public removeInterest = (e: any, index: number) => {
        e.preventDefault();
        this.setState({
            interests: this.state.interests.filter((_:any, i:any) => i !== index)
        });
    }

    public handleChange = (e:any) => {
        e.preventDefault();
        const interests = [...this.state.interests]   
        interests[e.target.id] = e.target.value
        this.setState({ interests }, () => console.log(this.state.interests))
      }

      public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const i = this.state;
        console.log(i.interests);
        for (const x of i.interests) {
            console.log(x);
            fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/addInterest`, {
                body: JSON.stringify({id: x}),
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
    }

    public render() {
        const { interests } = this.state;
        return (
            <div className="mt-5 pt-5 container">
                <form style={{ background: '#ADD8E6' }} className="form-signup" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please select your interests</h1>
                    <button onClick={this.addInterest}>Add Interest</button>
                    {
                        interests.map((val:any, index:any) => {
                            return (
                                <div key={index} className="form-group">
                                    <label htmlFor={`inputInterest${index}`} >{`Interest #${index + 1}`}</label>
                                    <select className="form-control"
                                        onChange={this.handleChange}
                                        value={interests[index].id}
                                        id={index}
                                        required
                                    >
                                        <option value="0">Select an Interest</option>
                                        <option value="1">Sports</option>
                                        <option value="2">Movies</option>
                                        <option value="3">Shopping</option>
                                        <option value="5">Beach</option>
                                        <option value="6">Traveling</option>
                                        <option value="7">Gaming</option>
                                    </select>
                                    <button onClick={(e) => this.removeInterest(e, index)}>Remove</button>
                                </div>
                            )
                        })
                    }

                    <button className="btn btn-lg btn-primary btn-block" type="submit" value="Add Node server">Sign in</button>
                    {/* {errorMessage && <p id="error-message">{errorMessage}</p>} */}
                </form>
            </div>

        )
    }
}

