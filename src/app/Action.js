import React, { Component } from 'react';

class Action extends Component {

	constructor(props){
		super(props);
		this.state = {
			text: props.text
		};
	}

	isNumeric = (num) => {
		return !isNaN(num);
	}

	handleInput = (event) => {

		let text = event.target.value;
		let isValid = false;
		if(text.length === 0){
			isValid = true;
		}
		else if(text.length === 1){
			if(this.isNumeric(text)){
				if(this.props.type === 'GOOD'){
					text = '+' + text;
				}
				else{
					text = '-' + text;
				}
				isValid = true;
			}
			else if(text.includes('+') && this.props.type === 'GOOD'){
				isValid = true;
			}
			else if(text.includes('-') && this.props.type === 'BAD'){
				isValid = true;
			}

		}
		else if(text.length > 1){
			let inputArray = text.split(' ');
			if(this.isNumeric(inputArray[0])){
				isValid = true;
			}

			if(inputArray.length === 2){
				if(!inputArray[1] && !this.state.text.includes('#')){
					text += '#';
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

	render(){
		var placeholder = null;
		if(this.props.id === 0){
			placeholder = 'format: [score] [action]'
		}
		if(this.props.id === 1){
			if(this.props.type === 'GOOD'){
				placeholder = 'example: +50 #MedsForMom';
			}
			else{
				placeholder = 'example: -100 #TooMuchTV';
			}
		}
		return(
			<div className="action">
				<input
					type="text"
					className="form"
					placeholder={placeholder}
					value={this.state.text}
					onChange={this.handleInput}
				/>
			</div>
		);
	}
}

export default Action;