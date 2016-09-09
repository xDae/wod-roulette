import React from 'react';

const Card = ({date, title, workout_title, image, popularity, score_type, workout}) => (
    <div className="post-module hover animated fadeIn">
      <div className="thumbnail">
        <div className="date">
          <div className="day">{popularity}</div>
          <div className="month">Mar</div>
        </div>
        <img src={image} />
        <div className="category">{score_type}</div>
      </div>
      <div className="post-content">
        <h1 className="title">{title}</h1>
        <h2 className="sub_title">{workout_title}</h2>
        <p className="description">
          {workout.map(e => (
            <li>{e}</li>
          ))}
        </p>
        {/* <div className="post-meta">
          <span className="timestamp"><i className="fa fa-clock-o"></i> 6 mins ago</span>
          <span className="comments"><i className="fa fa-comments"></i><a href="#"> 39 comments</a></span>
        </div> */}
      </div>
    </div>
);

Card.propTypes = {
  title: React.PropTypes.string.isRequired,
  workout_title: React.PropTypes.string.isRequired
};

export default Card;
