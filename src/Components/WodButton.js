import React from 'react';

const WodButton = (props) => (
	<button className="wod-button" onClick={props.setRandomWod}>{props.text}</button>
);

export default WodButton;
