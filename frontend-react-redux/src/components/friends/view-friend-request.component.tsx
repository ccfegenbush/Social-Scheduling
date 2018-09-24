import * as React from "react";
import { environment } from "../../environment";
export class FriendRequestComponent extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      currentRequest: [],
      friends: [],
      newRequests: {},
      requestId: 0,
      requests: []
    };
  }
  public componentDidMount() {
    // Fetches the Pending friend requests
    fetch(
      environment.context +
      `requests/friend/${JSON.parse(
        localStorage.getItem("userId") || "{}"
      )}/status/1`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(requests => {
        this.setState({ requests });
        // console.log(this.state.requests);
        for (const i of this.state.requests) {
          // console.log(i);
          const friendId = i.userId;

          // this finds all the users with the given id
          fetch(environment.context + `users/${friendId}`, {})
            .then(resp => resp.json())
            .then(friend => {
              this.setState({
                ...this.state,
                friends: [...this.state.friends, friend]
              });
              // console.log(this.state);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  public onApprove = (friendId: any, e: any) => {
    console.log(`approving with id: ${friendId}`);
    const userId = JSON.parse(localStorage.getItem("userId") || "{}");
    // console.log(`userId: ${userId}`);
    e.preventDefault();
    const id = friendId;

    // find the requestee id by the userId and friendId
    fetch(environment.context + `requests/friend/${userId}/fr/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then(resp => resp.json())
      .then(newRequests => {
        this.setState({ newRequests });
        console.log(this.state.newRequests);
        for (const i of this.state.newRequests) {
          console.log(i);
          const requestId = i.requestId;
          const statusId = { statusId: 2 };
          console.log(requestId);
          // on here we edit the status to be 2 or approved
          fetch(environment.context + `requests/editStatus/${requestId}`, {
            body: JSON.stringify(statusId),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "PUT"
          }).then(resp => resp.json());
        }
      })
      .catch(err => {
        console.log(err);
      });
    const array = [...this.state.friends]; // make a separate copy of the array
    const index = array.indexOf(e.target.value);
    array.splice(index, 1);
    this.setState({ friends: array });

    const userIdz = {"id": id };
    console.log("userid: " + id);
    console.log("friendid: " + userId);

      // update the mutual friends
    fetch(environment.context + `users/${userId}/addFriendRequest`, {
      body: JSON.stringify(userIdz),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(resp => resp.json())
      .catch(err => {
        console.log(err);
      });

      fetch(environment.context + `requests/friend/${id}/fr/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
        .then(resp => resp.json())
        .then(newRequests => {
          this.setState({ newRequests });
          console.log(this.state.newRequests);
          for (const i of this.state.newRequests) {
            console.log(i);
            const requestId = i.requestId;
            const statusId = { statusId: 2 };
            console.log(requestId);
            // on here we edit the status to be 2 or approved
            fetch(environment.context + `requests/editStatus/${requestId}`, {
              body: JSON.stringify(statusId),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "PUT"
            }).then(resp => resp.json());
          }
        })
        .catch(err => {
          console.log(err);
        });
  };



  // deny a friend request
  public onDeny = (friendId: any, e: any) => {
    console.log(`denying with id: ${friendId}`);
    const userId = JSON.parse(localStorage.getItem("userId") || "{}");
    console.log(`userId: ${userId}`);
    e.preventDefault();
    const id = friendId;
    fetch(environment.context + `requests/friend/${userId}/fr/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then(resp => resp.json())
      .then(newRequests => {
        this.setState({ newRequests });
        console.log(this.state.newRequests);
        for (const i of this.state.newRequests) {
          const requestId = i.requestId;
          const statusId = { statusId: 3 };

          // on here we edit the status to be 3 or denied
          fetch(environment.context + `requests/editStatus/${requestId}`, {
            body: JSON.stringify(statusId),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "PUT"
          }).then(resp => resp.json());
        }
      })
      .catch(err => {
        console.log(err);
      });

    const array = [...this.state.friends]; // make a separate copy of the array
    const index = array.indexOf(e.target.value);
    array.splice(index, 1);
    this.setState({ friends: array });
  };

  public render() {
    return (
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="h3 mb-3 font-weight-normal">Friend Requests</h1>
            <hr />
            <table
              style={{ background: "#ADD8E6" }}
              className="table table-striped"
            >
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Requestor's name</th>
                  <th scope="col">Accept or Deny</th>
                </tr>
              </thead>
              <tbody id="profile-table-body">
                {this.state.friends.map((friend: any) => (
                  <tr key={friend.id}>
                    <td>{friend.username}</td>
                    <td>{friend.firstName}</td>
                    <td>
                      <button
                        onClick={e => this.onApprove(friend.id, e)}
                        className="btn btn-success"
                      >
                        Accept
                      </button>
                      {' '}
                      <button
                        onClick={e => this.onDeny(friend.id, e)}
                        className="btn btn-danger"
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
