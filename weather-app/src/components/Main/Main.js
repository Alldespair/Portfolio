import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import CurrentWeather from '../Current/CurrentWeather';
import DailyWeather from '../Daily/DailyWeather';
import './main.sass'


export default function Main() {
    const user = useContext(UserContext);

    if (user.currentData && user.hourlyData && user.dailyData) {
        return (
            <div
                className='main'>
                    <CurrentWeather />
                    <DailyWeather />
            </div>

        )
    }
    else return (
        <h1>Loading...</h1>
    )
};