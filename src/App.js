import React, { Component } from 'react';
import base from './firebaseConfig';

// Components
import Logo from './Components/Logo';
import Card from './Components/Card';
import Loading from './Components/Loading';
import WodButton from './Components/WodButton';
import RatingButton from './Components/RatingButton';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      wods: [],
      totalWods: 0,
      selectedWOD: 0,
      votedWods: []
    };
  };

  componentDidMount() {
    base.bindToState('wods', {
      context: this,
      state: 'wods',
      asArray: true,
      then() {
        this.setState({
          isLoading: false,
          totalWods: this.state.wods.length,
          selectedWOD: this.getRamdomNumber(this.state.wods.length)
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

  updateVotedWods(wod) {
    let votedWods = this.state.votedWods.concat(wod);
    this.setState({votedWods});
  };

  updateRating() {
    let wodPosition = this.state.selectedWOD;
    let wodKey = this.state.wods[wodPosition].key;
    let rating = this.state.wods[wodPosition].popularity;

    var that = this;

    if(!this.state.votedWods.some(elem => elem === wodKey)) {
      base.update(`wods/${wodKey}`, {
        data: {popularity: rating + 1},
        then() {
          that.updateVotedWods(wodKey);
        }
      });
    }
  };

  getWodState(data) {
    return this.state.wods[this.state.selectedWOD][data];
  };

  renderContent(isLoading) {
    const ratingButton = (rating) => (
      <div><RatingButton updateRating={this.updateRating.bind(this)} rating={rating} /></div>
    );

    if (isLoading) {
      return <Loading text="loading" />;
    }

    return (
      <div>
        <Card
          wodKey={this.getWodState('key')}
          title={this.getWodState('title')}
          workout_title={this.getWodState('workout_title')}
          image={this.getWodState('thumbnail')}
          score_type={this.getWodState('score_types')}
          workout={this.getWodState('workout')}
          ratingButton={ratingButton(this.getWodState('popularity'))}
        />
        <WodButton text="Give me Other WOD" handleClick={this.setRandomWod.bind(this)} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Logo text="Wod Roulette" />

        {this.renderContent(this.state.isLoading)}
      </div>
    )
  };
}

export default App;
