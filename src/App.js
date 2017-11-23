import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

export function itemsFetchData(url) {
    }

class App extends Component {
  componentDidMount() {
    this.props.coolio('http://5826ed963900d612000138bd.mockapi.io/items');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to {this.props.title}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        title: state.hello
    };
};

function sayHello(title) {
  console.log(title);
    return {
        type: 'HELLO',
        title: title
    };
}

function cool(url) {
    return (dispatch) => {

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(sayHello('#karma'));
                return response;
            });
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        coolio: (url) => dispatch(cool(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
