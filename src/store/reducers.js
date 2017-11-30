import { combineReducers } from 'redux';
import moment from 'moment';

function hello(state = 'Redux', action) {
    switch (action.type) {
        case 'HELLO':
          return action.title
        default:
            return state;
    }
}

const IDEAL_NO_OF_ACTS = 7;

function getDefaultActions(actions, isGood){
    let l = actions.length;
    for(let i=0; i < (IDEAL_NO_OF_ACTS - l); i++){
        actions.push({hashtag: '', karma: null, id: null, isGood: isGood});
    }
    return actions;
}

function separateIntoGoodAndBad(actionsArray){
    let actions = { good: [], bad: []};
    for(let action of actionsArray){
        if(action.isGood){
            actions.good.push(action);
        }
        else{
            actions.bad.push(action);
        }
    }
    if(actions.good.length < IDEAL_NO_OF_ACTS){
        actions.good = getDefaultActions(actions.good, true);
    }
    if(actions.bad.length < IDEAL_NO_OF_ACTS){
        actions.bad = getDefaultActions(actions.bad, false);
    }
    return actions;
}

function actions(state = [], action) {
    switch (action.type) {
        case 'ACTIONS_UPDATE':
            return separateIntoGoodAndBad(action.actions)
        default:
            return separateIntoGoodAndBad(state);
    }
}


function date(state = moment().format('Do MMM'), action) {
    switch(action.type){
        default:
            return state;
    }
}

function karma(state = '--', action) {
    switch(action.type){
        case 'KARMA_UPDATE':
            return action.karma
        default:
            return state;
    }
}

export default combineReducers({
    hello,
    actions,
    date,
    karma
});