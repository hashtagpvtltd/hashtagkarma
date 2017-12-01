import React, { Component } from 'react';

class Action extends Component {

	constructor(props){
		super(props);
		this.state = {
			text: this.getInputText(props)
		};
	}

	componentWillReceiveProps(props){
		this.setState({
			text: this.getInputText(props)
		});
	}

	getInputText(props){
		let text = '';
		if(props.karma){
			if(props.isGood){
				text += '+';
			}
			else{
				text += '-';
			}
			text += props.karma + ' #' + props.hashtag ;
		}
		return text;
	}

	isNumeric = (num) => {
		return !isNaN(num);
	}

	isAlphaNumeric = (text) => {
		return text.match(/^[a-z0-9]+$/i);
	}

	handleInput = (event) => {

		let text = event.target.value;
		let isValid = false;
		if(text.length === 0){
			isValid = true;
		}
		else if(text.length === 1){
			if(this.isNumeric(text)){
				if(this.props.isGood){
					text = '+' + text;
				}
				else{
					text = '-' + text;
				}
				isValid = true;
			}
			else if(text.includes('+') && this.props.isGood){
				isValid = true;
			}
			else if(text.includes('-') && !this.props.isGood){
				isValid = true;
			}

		}
		else if(text.length > 1){
			let inputArray = text.split(' ');
			if(this.isNumeric(inputArray[0]) || ['+', '-'].indexOf(inputArray[0]) > -1 ){
				isValid = true;
			}

			if(inputArray.length === 2){
				if(!inputArray[1] && !this.state.text.includes('#')){
					text += '#';
				}

				if(inputArray[1].length>1){
					var hashlessTag = inputArray[1].replace(/^#/, '');
					if(!this.isAlphaNumeric(hashlessTag)){
						isValid = false;
					}
				}
			}
			else if(inputArray.length > 2){
				isValid = false;
			}
		}
		if(isValid){
			this.setState({
				text: text
			});
		}
	}

	handleKeyPress = (event) => {
		if(event.keyCode === 13){ // i.e. Enter	
			let karma = parseInt( this.state.text.split(' ')[0].slice(1), 10);
			let hashtag = this.state.text.split(' ')[1].slice(1);
			let action = {
				hashtag: hashtag,
				isGood: this.props.isGood,
				karma: karma,
				id: this.props.id,
				key: this.props._key,
				date: this.props.date
			}
			this.props.updateAction(action);
		}
	}

	render(){
		var placeholder = null;
		/*
			if(this.props.isGood){
				placeholder = '+50 #MedsForMom';
			}
			else{
				placeholder = '-100 #TooMuchTV';
			}
		*/

		return(
			<div className="action">
				<input
					type="text"
					className="form"
					placeholder={placeholder}
					value={this.state.text}
					onChange={this.handleInput}
					onKeyDown={this.handleKeyPress}
				/>
			</div>
		);
	}
}

export default Action;