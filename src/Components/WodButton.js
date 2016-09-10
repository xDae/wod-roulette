import React from 'react';

const WodButton = ({text, handleClick}) => (
	<button className="wod-button" onClick={handleClick}>{text}</button>
);

WodButton.propTypes = {
	handleClick: React.PropTypes.func,
	text: React.PropTypes.string.isRequired
};

export default WodButton;
