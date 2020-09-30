import React, { Component } from 'react';
import Calendar from '../components/Calendar/index';
import PopUp from '../components/PopUp/popup';
import './Home.sass'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      showModal: false,
    };
  }

  hendleDateChange = date => {
    this.setState({ date });
    this.toggleModal();
  };

  toggleModal = () => {
    this.state.showModal = this.setState({showModal: !this.state.showModal});
  }

  render() {

    const { date, showModal } = this.state;

    return (
      <div className='home'>
        <PopUp isShow={showModal} date={date} toggleModal={this.toggleModal}/>
        <div className="home__container">
          <div className="home__content">
            <h1>
              Choose the day for the meeting
            </h1>
            <p>
              We encourage you to book your appointment online.<br/> This will save you time.
            </p>
          </div>
          <div className="home__calendar">
            <Calendar
              onChange={this.hendleDateChange}
            />
          </div>
        </div>
      </div>
    )
  }
}