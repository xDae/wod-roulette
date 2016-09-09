import React from 'react';

const Loading = props => (
	<div className="loading animated fadeIn">
		<div>
			<div className="c1"></div>
			<div className="c2"></div>
			<div className="c3"></div>
			<div className="c4"></div>
		</div>
		<span>{props.text}</span>
	</div>
);

Loading.propTypes = {
	text: React.PropTypes.string
};

Loading.defaultProps = {
	text: 'loading'
};

export default Loading;
