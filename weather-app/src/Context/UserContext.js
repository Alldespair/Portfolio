import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentData, setCurrentData] = useState(null);
    const [hourlyData, setHoulyData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    
    return (
        <UserContext.Provider
            value={{
                currentData,
                hourlyData,
                dailyData,
                setCurrentData,
                setHoulyData,
                setDailyData
            }}
        >
            {children}
        </UserContext.Provider>
    );
};