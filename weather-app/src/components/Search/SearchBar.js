import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import './search-bar.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {
    const user = useContext(UserContext);
    const API_KEY = 'e68a16f9c4f64ae037ce6dd8536641fb';
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [localCoords, setLocalCoords] = useState({});
    const [coord, setCoord] = useState({});


    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            getCoordByCityName();
        };
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocalCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
    };

    const getCoordByCityName = () => {
        if (cityName) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
                .then(res => {
                    const result = res.data;
                    setCoord(result.coord)
                });
        };
    };

    const getDataByCoords = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric`)
            .then(res => {
                const result = res.data;
                setWeatherData(result);
            });
    };

    const getDataByLocalCoords = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${localCoords.lat}&lon=${localCoords.lon}&appid=${API_KEY}&units=metric`)
            .then(res => {
                const result = res.data;
                setWeatherData(result);
            });
    };

    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        if (coord.lat & coord.lon) {
            getDataByCoords()
        }
    }, [coord]);

    useEffect(() => {
        if (localCoords.lat & localCoords.lon) {
            getDataByLocalCoords()
        };
    }, [localCoords]);

    useEffect(() => {
        if (weatherData) {
            const a = [];
            weatherData.daily.slice(1).map((item, index) => (
                a.push({
                    active: index === 0 ? true : false,
                    dt: item.dt,
                    temp_max: item.temp.max,
                    temp_min: item.temp.min,
                    humidity: item.humidity,
                    pressure: item.pressure,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    wind_deg: item.wind_deg,
                    wind_speed: item.wind_speed
                })
            ))
            console.log((a));
            user.setDailyData(a);
            user.setCurrentData(weatherData.current);
            user.setHoulyData(weatherData.hourly);
        }
    }, [weatherData]);

    return (
        <div className="search-bar">
            <input
                type='text'
                className="search-bar__input-text"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onKeyUp={(e) => onKeyUp(e)}
            />
            <button
                className="search-bar__button"
                onClick={getCoordByCityName}
                >
                    Search
            </button>
            <button
                className="search-bar__button search-bar__button-geolocation"
                onClick={getDataByLocalCoords}
                >
                    <FontAwesomeIcon icon={faLocationArrow} />
            </button>
        </div>
    )
};