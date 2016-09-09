import React from 'react';

const RatingButton = ({updateRating, rating}) => (
	<button onClick={updateRating} className="date animated tada">
		<div className="day">
			<i className="fa fa-thumbs-o-up"></i><br/><span className="popularity">{rating}</span>
		</div>
	</button>
);

RatingButton.propTypes = {
	updateRating: React.PropTypes.func.isRequired,
	rating: React.PropTypes.number.isRequired
};

export default RatingButton;
