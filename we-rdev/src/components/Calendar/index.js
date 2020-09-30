import React from 'react';
import classnames from 'classnames';
import * as calendar from './calendar';
import './index.sass';

export default class Calendar extends React.Component {
  static defaultProps = {
    date: new Date(),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
    weekDayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    onChange: Function.prototype
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
    monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],

  };

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  formatDay(day) {
    return day < 10 ? '0' + day.toString() : day.toString();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);

    this.setState({ date });
  };

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);

    this.setState({ date });
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;

    const date = new Date(year, month);

    this.setState({ date });
  };

  handleDayClick = date => {
    this.setState({ selectedDate: date});

    this.props.onChange(date);
  };

  render() {
    const { years, monthNames, weekDayNames} = this.props;
    const { currentDate, selectedDate } = this.state;

    const monthData = calendar.getMonthDate(this.year, this.month);
    return (
      <div className='calendar'>
        <header className='calendar__header'>
          <button onClick={this.handlePrevMonthButtonClick}>{'❮'}</button>
          <div>
            <div>
              {monthNames[this.month]} {this.year}
            </div>
          </div>
          <button onClick={this.handleNextMonthButtonClick}>{'❯'}</button>
        </header>

        <div className='calendar__table'>
          {monthData.map((week, index) =>
            <div key={index} className='calendar__table__week'>
              {week.map((date, index) => date ?
                <div
                  key={index}
                  className={classnames('calendar__table__week__day', {
                    'today': calendar.areEqual(date, currentDate),
                    'selected': calendar.areEqual(date, selectedDate)
                  })}
                  onClick={() => this.handleDayClick(date)}
                >{this.formatDay(date.getDate())}</div>
                :
                <div className='calendar__table__week__over' key={index}>xx</div>
                )}
            </div>
          )}
        </div>

        <footer className='calendar__footer'>
          {weekDayNames.map(name =>
            <div key={name}>{name}</div>
            )}
        </footer>
      </div>
    )
  }
}