import React, { Component } from 'react';
import Card from './Card'
import './App.css';

import Rebase from 're-base';

var base = Rebase.createClass({
		apiKey: "AIzaSyDoizxbDrmXFj8k89BMGH5Mw_l4jk3F0fM",
	 	authDomain: "project-8681004705566154074.firebaseapp.com",
	 	databaseURL: "https://project-8681004705566154074.firebaseio.com",
	 	storageBucket: "project-8681004705566154074.appspot.com",
});

class App extends Component {
	constructor(props) {
    super(props);

    this.state = {
			isLoading: true,
      wods: [],
			totalWods: 0,
			wodShown: {
				date: '',
				title: '',
				workout_title: '',
				thumbnail: 'http://wodwell.com/wp-content/uploads/2014/09/crossfit-box2.jpg',
				popularity: 0,
				score_types: '',
				workout: []
			}
    };
  }

	componentDidMount() {
	  base.fetch(`wods`, {
	    context: this,
	    asArray: true,
			then(wods) {
	      this.setState({
					wods,
					totalWods: wods.length,
					isLoading: false
				});
				this.setRandomWod();
	    }
	  });
	}

	setRandomWod() {
		let totalWods = this.state.totalWods;
		let randomNumber = Math.floor((Math.random() * totalWods));
		let wod = this.state.wods[randomNumber];

		this.setState({'wodShown': wod});
	}

	renderLoading() {
			return (
				<div className="loading animated fadeIn">
					<div>
						<div className="c1"></div>
						<div className="c2"></div>
						<div className="c3"></div>
						<div className="c4"></div>
					</div>
					<span>loading</span>
				</div>
			);
	}

  render() {
		if (this.state.isLoading) {
			return this.renderLoading()
		}

		return (
			<div className="App">
				<Card
					date={this.state.wodShown.date}
					title={this.state.wodShown.title}
					workout_title={this.state.wodShown.workout_title}
					image={this.state.wodShown.thumbnail}
					popularity={this.state.wodShown.popularity}
					score_type={this.state.wodShown.score_types}
					workout={this.state.wodShown.workout}
				/>
				<button className="wod-button" onClick={this.setRandomWod.bind(this)}>Give me Other WOD</button>
			</div>
		)
  }
}

export default App;
