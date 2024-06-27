import React, { useState, useEffect } from 'react';
import Login from './Login';
import Home from './Home';
import BoyKiloForm from './BoyKiloForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [dailyCalories, setDailyCalories] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserInfo(null);
    setDailyCalories(null);
  };

  const handleUserInfo = (info) => {
    setUserInfo(info);
    calculateDailyCalories(info);
  };

  const calculateDailyCalories = (info) => {
    const { height, weight, gender, age } = info;
    let bmr = 0;

    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityLevels = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const dailyCaloriesNeeded = bmr * activityLevels['moderate']; // Or choose appropriate activity level
    setDailyCalories(dailyCaloriesNeeded);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : userInfo ? (
        <Home onLogout={handleLogout} userInfo={userInfo} dailyCalories={dailyCalories} />
      ) : (
        <BoyKiloForm onSubmit={handleUserInfo} />
      )}
    </div>
  );
}

export default App;
