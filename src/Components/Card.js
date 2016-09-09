import React from 'react';

const Card = ({title, workout_title, image, popularity, score_type, workout, ratingButton}) => (
	<div className="post-module hover animated fadeIn">
		<div className="thumbnail">
			{ratingButton}
			<img alt={title} src={image} />
			<div className="category">{score_type}</div>
		</div>
		<div className="post-content">
			<h1 className="title">{title}</h1>
			<h2 className="sub_title"><i className="fa fa-clock-o"></i> {workout_title}</h2>
			<p className="description">
				{workout.map((e, index) => (
					<li key={index}>{e}</li>
				))}
			</p>
			{/* <div className="post-meta">
				<span className="timestamp"><i className="fa fa-clock-o"></i> {workout_title}</span>
				<span className="comments"><i className="fa fa-comments"></i><a href="#"> 39 comments</a></span>
			</div> */}
		</div>
	</div>
);

Card.propTypes = {
  title: React.PropTypes.string.isRequired,
	workout_title: React.PropTypes.string,
	image: React.PropTypes.string,
	popularity: React.PropTypes.number,
	score_type: React.PropTypes.string,
	workout: React.PropTypes.array
};

Card.defaultProps = {
	title: '',
	workout_title: '',
	image: 'http://wodwell.com/wp-content/uploads/2014/09/crossfit-box2.jpg',
	popularity: 0,
	score_type: '',
	workout: [],
};

export default Card;
