import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';
import './forms.css';
import Action from './Action';
import { updateKarma } from './actions';


export function itemsFetchData(url) {
    }

class App extends Component {
  componentDidMount() {
    this.props.coolio('http://5826ed963900d612000138bd.mockapi.io/items');
  }
  render() {
    var goodActionsComp = [];
    var badActionsComp = [];
    for(var action of this.props.actions){
      if(action.type === 'GOOD'){
        goodActionsComp.push( 
          <Action 
            text={action.text} 
            key={action.key} 
            id={action.id} 
            type='GOOD' 
            updateAction = {this.props.updateAction}
          /> 
        );
      }
      else if(action.type === 'BAD'){
        badActionsComp.push( 
          <Action 
            text={action.text} 
            key={action.key} 
            id={action.id} 
            type='BAD' 
            updateAction = {this.props.updateAction}
          /> 
        );
      }
    }

    return (
      <div className="container">
        <div className="pseudo-container">

          <div className="header font-x-large font-bold">
            <span className="color-green">{this.props.karma}</span>
          </div>

          <div className="body">
            <div className="body-heading font-large">
              {this.props.date}
            </div>
            <div className="body-container">
              <div className="good actions">
                <div className="heading font-medium">Good</div>
                <div className="actions-list">
                  {goodActionsComp}
                </div>
              </div>
              <div className="bad actions">
                <div className="heading font-medium">Bad</div>
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
        actions: state.actions,
        date: state.date,
        karma: state.karma
    };
};

function sayHello(title) {
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

function appUpdateAction(hashtag, isGood, karma){
  return (dispatch) => {
    dispatch(updateKarma(karma));
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coolio: (url) => dispatch(cool(url)),
        updateAction: (hashtag, isGood, karma) => dispatch( appUpdateAction(hashtag, isGood, karma) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
