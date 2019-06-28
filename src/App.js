import React, { Component } from 'react';
import Item from './components/item';
import axios from 'axios';
import CBuffer from 'CBuffer';
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
        // either pageYOffset or documentElement.scrolTop for compatibility
        window.innerHeight + window.pageYOffset || document.documentElement.scrollTop
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

    axios.get('https://randomuser.me/api/?results=30')
      .then((response) => {

        this.setState({
          isLoading: false
        })
        
        // Create circular buffer and bring together user state and results.
        const dataBuffer = new CBuffer(300);
        dataBuffer.push(...this.state.users, ...response.data.results)

        this.setState({
          users: dataBuffer.toArray()
        })
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
    const {users, isLoading} = this.state;
    return (
      <>
      <div className="cards">
        {
          users.map((user) => {
            return (
              <Item
                key={user.login.uuid}
                name={`${user.name.first} ${user.name.last}`} 
                img={user.picture.large}
              />
            )
        })
        }
      </div>
      {isLoading && <h3 className='loading'>Loading...</h3>}
      </>
    );
  }
}

export default App;
