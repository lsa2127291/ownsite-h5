import React, {Component} from 'react';
import NavBar from '../components/Navbar/Navbar';
import '../styles/layout.scss';
class App extends Component {
  render () {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
export default App;

