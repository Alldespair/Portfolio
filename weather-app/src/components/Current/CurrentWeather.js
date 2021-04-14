import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import dataConverter from '../../helpers/dataConverter';
import './current-weather.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faWater, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

export default function CurrentWeather() {
    const user = useContext(UserContext);
    const currentData = user.currentData;
    const hourlyData = user.hourlyData.slice(1, 7);
    return (
        <div className='current'>
            <div className='current-info'>
                <div className='current-info__item'>
                    <h2 className='current__title'>
                        {dataConverter(currentData.dt).month}
                        {dataConverter(currentData.dt).date}
                        th
                    </h2>
                    <div className='current-info__item__main-info'>
                        <p className='current-info__item__main-info__temp'>{Math.round(currentData.temp)}°</p>
                        <img
                            className='current-info__item__main-info__weather-icon'
                            alt='weather icon'
                            src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`} />
                    </div>
                    <div className='current-info__item__аdd-info'>
                        <p className='current-info__item__аdd-info__item'><FontAwesomeIcon icon={faFeatherAlt} /> {Math.round(currentData.feels_like)}°</p>
                        <p className='current-info__item__аdd-info__item'><FontAwesomeIcon icon={faWater} /> {Math.round(currentData.humidity)}%</p>
                        <p className='current-info__item__аdd-info__item'><FontAwesomeIcon icon={faWind} /> {Math.round(currentData.wind_speed)} km/h</p>
                    </div>
                </div>
                <div className='hourly-items'>
                    {
                        hourlyData.map((item, index) => (
                            <div key={index} className='hourly-item'>
                                <p className='hourly-item__data'>
                                    {dataConverter(item.dt).time}
                                </p>
                                <img
                                    className='hourly-item__image'
                                    alt='weather icon'
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                />
                                <p className='hourly-item__info'>{Math.round(item.temp)}°</p>
                                <p className='hourly-item__info'>{Math.round(item.humidity)}%</p>
                                <p className='hourly-item__wind'>{Math.round(currentData.wind_speed)}</p>
                                <p className='hourly-item__wind-title'>km/h</p>
                                <p
                                    className='hourly-item__wind-deg'
                                    style={{transform: `rotate(${currentData.wind_deg}deg)` }}>
                                    ↑
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};