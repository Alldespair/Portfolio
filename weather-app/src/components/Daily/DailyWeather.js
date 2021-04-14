import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import dataConverter from '../../helpers/dataConverter'
import './daily-weather.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faWater, faFeatherAlt, faThermometerFull, faThermometerQuarter } from '@fortawesome/free-solid-svg-icons'

export default function DailyWeather() {
    const user = useContext(UserContext);
    const [dailyArr, setDailyArr] = useState([]);

    useEffect(() => {
        if (user.dailyData) {
            setDailyArr(user.dailyData)
        };
    }, [user.dailyData]);

    const HandleShowMore = (id) => {
        const a = [...dailyArr];
        a.map((item, index) => (
            index === id ?
                item.active = true
                :
                item.active = false
        ))
        setDailyArr(a)
    }

    return (
        <div className='daily-info'>
            {dailyArr.map((item, index) => (
    
                item.active ?
                    <div className='daily-info__more'>
                        <h2 className='daily-info__title'>{dataConverter(item.dt).day}</h2>
                        <div className='daily-info__more__main-info'>
                            <p className='daily-info__more__main-info__temp'>{Math.round(item.temp_max)}°</p>
                            <img className='daily-info__more__main-info__weather-icon'
                                src={`http://openweathermap.org/img/wn/${item.icon}@4x.png`} />
                        </div>
                        <div className='daily-info__more__аdd-info'>
                            <p><FontAwesomeIcon icon={faThermometerQuarter} /> {Math.round(item.temp_min)}°</p>
                            <p className='daily-info__more__аdd-info__item'><FontAwesomeIcon icon={faWater} /> {Math.round(item.humidity)}%</p>
                            <p className='daily-info__more__аdd-info__item'><FontAwesomeIcon icon={faWind} /> {Math.round(item.wind_speed)} km/h</p>
                        </div>
                    </div>
                    :
                    <div key={index} id={index} onClick={() => HandleShowMore(index)} className='daily-info__less'>
                        <p>{dataConverter(item.dt).day_min}</p>
                        <img
                            className='daily-info__less__weather-icon'
                            src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        />
                        <p className='daily-info__less__weather-info'>{Math.round(item.temp_max)}°</p>
                        <p className='daily-info__less__weather-info'>{Math.round(item.humidity)}%</p>
                        <p className="daily-info__less__wind">{Math.round(item.wind_speed)}</p>
                        <p className='daily-info__less__wind-title'>km/h</p>
                        <p className="daily-info__less__wind-deg" style={{ transform: `rotate(${item.wind_deg}deg)` }}>↑</p>
                    </div>
            ))}
        </div>
    )
};