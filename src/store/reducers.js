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

var defaultActions = [];
for(var i=0, iGood=0, iBad=0; i<14; i++){
	if(i === 0 || i%2 === 0){
		defaultActions.push({text: '', key: iGood, id: iGood, type:'GOOD'});
		iGood++;
	}
	else{
		defaultActions.push({text: '', key: iBad, id: iBad, type:'BAD'});
		iBad++;
	}
}

function actions(state = defaultActions, action) {
    switch (action.type) {
        case 'EMPTY':
          return null
        default:
            return state;
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
        case 'UPDATE':
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