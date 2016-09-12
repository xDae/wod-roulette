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

  setRandomWod = () => {
    let totalWods = this.state.totalWods;
    let selectedWOD = this.getRamdomNumber(totalWods);

    this.setState({selectedWOD});
  };

  updateVotedWods(wod) {
    let votedWods = this.state.votedWods.concat(wod);
    this.setState({votedWods});
  };

  updateRating = () => {
    let {wods, selectedWOD} = this.state;

    let wodKey = wods[selectedWOD].key;
    let rating = wods[selectedWOD].popularity;

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

  renderContent(isLoading) {
    const ratingButton = rating => (
      <div><RatingButton updateRating={this.updateRating} rating={rating} /></div>
    );

    if (isLoading) {
      return <Loading text="loading" />;
    }

    let {wods, selectedWOD} = this.state;

    return (
      <div>
        <Card
          wodKey={wods[selectedWOD].key}
          title={wods[selectedWOD].title}
          workout_title={wods[selectedWOD].workout_title}
          image={wods[selectedWOD].thumbnail}
          score_type={wods[selectedWOD].score_types}
          workout={wods[selectedWOD].workout}
          ratingButton={ratingButton(wods[selectedWOD].popularity)}
        />
        <WodButton text="Give me Other WOD" handleClick={this.setRandomWod} />
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
