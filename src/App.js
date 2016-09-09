import React, { Component } from 'react';
import Rebase from 're-base';

import Card from './Components/Card'
import Loading from './Components/Loading';
import WodButton from './Components/WodButton';

import './App.css';

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
			selectedWod: {
				date: '',
				title: '',
				workout_title: '',
				thumbnail: '',
				popularity: '',
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
		let selectedWod = this.state.wods[randomNumber];

		this.setState({selectedWod});
	}

  render() {
		if (this.state.isLoading) {
			return <Loading />;
		}

		return (
			<div className="App">
				<Card
					title={this.state.selectedWod.title}
					workout_title={this.state.selectedWod.workout_title}
					image={this.state.selectedWod.thumbnail}
					popularity={this.state.selectedWod.popularity}
					score_type={this.state.selectedWod.score_types}
					workout={this.state.selectedWod.workout}
				/>

				<WodButton text="Give me Other WOD" setRandomWod={this.setRandomWod.bind(this)} />
			</div>
		)
  }
}

export default App;
