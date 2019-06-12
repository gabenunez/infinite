import React, { Component } from 'react';
import Item from './components/item';
import axios from 'axios';
import './App.css';


class App extends Component {
  
  state = {
    error: false,
    isLoading: false,
    users: [],
  }

  constructor(props) {
    super(props);

    window.onscroll = () => {
      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        this.fetchUsers();
      }
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.setState({
      isLoading: true
    })

    axios.get('https://randomuser.me/api/?results=50')
      .then((response) => {
        // handle success
        this.setState({
          isLoading: false
        })

        this.setState({
          users: [...this.state.users, ...response.data.results]
        })

        console.log(this.state.users)
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: true,
          isLoading: false
        })
      })
  }

  render() {
      return (
        <div className="App">
          {this.state.users.map((user) => <p key={user.login.uuid}>{user.name.title} {user.name.first} {user.name.last}</p>)}
          {this.state.isLoading && <h3>Loading...</h3>}
        </div>
    );
  }
}

export default App;
