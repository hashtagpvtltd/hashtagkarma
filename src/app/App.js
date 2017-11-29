import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';
import './forms.css';
import Action from './Action';


export function itemsFetchData(url) {
    }

class App extends Component {
  componentDidMount() {
    this.props.coolio('http://5826ed963900d612000138bd.mockapi.io/items');
  }
  render() {
    var goodActionsComp = [];
    var badActionsComp = [];
    var karma = 40;
    for(var action of this.props.actions){
      if(action.type === 'GOOD'){
        goodActionsComp.push( <Action text={action.text} key={action.key} id={action.id} type='GOOD' /> )
      }
      else if(action.type === 'BAD'){
        badActionsComp.push( <Action text={action.text} key={action.key} id={action.id} type='BAD' /> )
      }
    }

    return (
      <div className="container">
        <div className="pseudo-container">

          <div className="header font-x-large font-bold">
            <span className="color-green">{karma}</span>
          </div>

          <div className="body">
            <div className="body-heading font-large">
              25th Nov
            </div>
            <div className="body-container">
              <div className="good actions">
                <div className="heading font-medium">Good</div>
                <div className="actions-list">
                  {goodActionsComp}
                </div>
              </div>
              <div className="bad actions">
                <div class="heading font-medium">Bad</div>
                <div className="actions-list">
                  {badActionsComp}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        title: state.hello,
        actions: state.actions
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
