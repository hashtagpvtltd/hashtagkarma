import { combineReducers } from 'redux';

function hello(state = 'Redux', action) {
    switch (action.type) {
        case 'HELLO':
          return action.title
        default:
            return state;
    }
}

var defaultActions = [];
for(var i=0, iGood=0, iBad=0; i<20; i++){
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

export default combineReducers({
    hello,
    actions
});