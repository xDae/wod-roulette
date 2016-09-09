import React from 'react';

const Logo = props => (
	<h1 className="logo">{props.text}</h1>
);

Logo.propTypes = {
	text: React.PropTypes.string.isRequired
};

export default Logo;
