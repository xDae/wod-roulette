import React from 'react';

const Logo = ({text}) => (
	<h1 className="logo">{text}</h1>
);

Logo.propTypes = {
	text: React.PropTypes.string.isRequired
};

export default Logo;
