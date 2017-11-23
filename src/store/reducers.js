import { combineReducers } from 'redux';

function hello(state = 'Redux', action) {
    switch (action.type) {
        case 'HELLO':
          return action.title
        default:
            return state;
    }
}

export default combineReducers({
    hello
});