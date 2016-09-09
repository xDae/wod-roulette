import React, { Component } from 'react';
import Rebase from 're-base';

import Logo from './Components/Logo';
import Card from './Components/Card';
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
			selectedWOD: 0
    };
  };

	componentDidMount() {
	  base.fetch(`wods`, {
	    context: this,
	    asArray: true,
			then(wods) {
	      this.setState({
					wods,
					totalWods: wods.length,
					isLoading: false,
					selectedWOD: this.getRamdomNumber(wods.length)
				});
	    }
	  });
	};

	getRamdomNumber(max) {
		return Math.floor((Math.random() * max));
	};

	setRandomWod() {
		let totalWods = this.state.totalWods;
		let selectedWOD = this.getRamdomNumber(totalWods);

		this.setState({selectedWOD});
	};

	getData(data) {
		return this.state.wods[this.state.selectedWOD][data];
	}

  render() {
		if (this.state.isLoading) {
			return <Loading text="loading" />;
		}

		return (
			<div className="App">
				<Logo text="Wod Roulette" />

				<Card
					title={this.getData('title')}
					workout_title={this.getData('workout_title')}
					image={this.getData('thumbnail')}
					popularity={this.getData('popularity')}
					score_type={this.getData('score_types')}
					workout={this.getData('workout')}
				/>

				<WodButton text="Give me Other WOD" setRandomWod={this.setRandomWod.bind(this)} />
			</div>
		)
  };
}

export default App;
