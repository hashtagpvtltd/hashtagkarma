import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';
import './forms.css';
import Action from './Action';
import { updateKarma, updateActions, updateAction } from './actions';
import axios from 'axios';


class App extends Component {
  componentDidMount() {
    this.props.getActions(this.props.date.db);
  }
  render() {
    var goodActionsComp = [];
    var badActionsComp = [];

    this.props.actions.good.forEach( (action, key) => {
      let actionComp = (<Action 
        hashtag={action.hashtag} 
        karma={action.karma}
        key={key}
        _key={key}
        id={action.id} 
        isGood={action.isGood} 
        updateAction = {this.props.updateAction}
        date = {this.props.date.db}
      />);
      goodActionsComp.push(actionComp);
    });

    this.props.actions.bad.forEach( (action, key) => {
      let actionComp = (<Action 
        hashtag={action.hashtag} 
        karma={action.karma}
        key={key}
        _key={key}
        id={action.id} 
        isGood={action.isGood} 
        updateAction = {this.props.updateAction}
        date = {this.props.date.db}
      />);
      badActionsComp.push(actionComp);
    });

    return (
      <div className="container">
        <div className="pseudo-container">

          <div className="header font-x-large font-bold">
            <span className="color-green">{this.props.karma}</span>
          </div>

          <div className="body">
            <div className="body-heading font-large">
              {this.props.date.display}
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

function appGetActions(date) {
  return (dispatch) => {

    let data = {
      "query": "query ($date: String!) { \n actions(date: $date) { \n id \n hashtag \n karma \n isGood \n }, \n karma \n }",
      "variables": {
          "date": date
      }
    };

    axios.post(localStorage.getItem('apiRoot')+'/api', data)
    .then( (response) => {
      dispatch(updateKarma(response.data.data.karma));
      dispatch(updateActions(response.data.data.actions));
    })
    .catch( (error) => {
      console.log(error);
    });

  };
}

function appUpdateKarma(karma){
  return (dispatch) => {
    dispatch(updateKarma(karma));
  }
}

function appUpdateAction(action){
  return (dispatch) => {

    let data = {
      "query": "mutation updateAction($input: ActionInput) { \n updateAction(input: $input) \n { \n action karma \n  } \n }",
      "variables": {
          "input":{
              "hashtag": action.hashtag,
              "isGood": action.isGood,
              "karma": action.karma,
              "id": action.id,
              "date": action.date
          }
      }
    };

    axios.post(localStorage.getItem('apiRoot')+'/api', data)
    .then( (response) => {
      let data = response.data.data.updateAction;
      action.id = data.action;
      dispatch(updateAction(action));
      dispatch(updateKarma(data.karma));
    })
    .catch( (error) => {
      console.log(error);
    });

  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getActions: (date) => dispatch(appGetActions(date)),
        updateKarma: (karma) => dispatch(appUpdateKarma(karma)),
        updateAction: (action) => dispatch( appUpdateAction(action) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
