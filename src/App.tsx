import './additional/App.css';
import './utils/cookies_helpers';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { LogoutForm } from './components/auth/LogoutForm';
import { SimpleNavbar } from './components/SimpleNavbar';

import { AuthProvider } from './Auth/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAuth } from './Auth/RequireAuth';
import { useEffect, useState } from 'react';
import { api_https } from './utils/constants';
import { type } from 'os';
import { dir } from 'console';

function App() {
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // <ButtonWithLoader text='Text' loadingText='Loading Text' onClick={async () => sleep(1000)}/>

  return (
    <div className="App">
      <AuthProvider>
        
        {/* Общий навбар для всего приложения */}
        <SimpleNavbar/>
        
        {/* Сюда складываются роуты */}
        <Routes>
          {/* А это роут который складывает в себя другие роуты */}
          <Route path='/' element={ <Layout/> }>
            {/* Пути вложенных роутов идут относительно родительского роута */}
            {/* index означает, что это ровно тот адрес, который у родительского */}
            <Route index element={ <PublicPage/> }/>
            {/* А тут уже будет путь '/' + 'login' = '/login' */}
            <Route path="login" element={ <LoginForm/> }/>
            {/* '/' + 'private' = '/private' */}
            <Route path="private"
              element={
                <RequireAuth>
                  <ProtectedPage/>
                </RequireAuth>
              }
            />
            {/* и эти по такому же правилу */}
            <Route path='register' element={ <RegisterForm/> }/>
            <Route path='logout' element={ <LogoutForm/> }/>
          </Route>

        </Routes>

      </AuthProvider>
    </div>
  );
}

function PublicPage() {
  interface WeatherData {
    date: string,
    temperatureC: number
  }

  const [ weather, setWeather ] = useState(new Array<WeatherData>);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      let response = await fetch(api_https + '/WeatherForecast', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      });
      
      if(response.ok) {
        setWeather( await response.json());
      } else {
        let text = await response.text();
        alert("Code " + response.status + ", message: " + text);
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

  return <div>
    <p>Public page. Public Weather (no need to log in):</p>
    { weather.map(w => <p> in {w.date} the weather will be {w.temperatureC} in censium degree </p>) }
  </div>;
}

function ProtectedPage() {
  interface WeatherData {
    date: string,
    temperatureC: number
  }

  const [ weather, setWeather ] = useState(new Array<WeatherData>);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      let response = await fetch(api_https + '/WeatherForecast/private_weather', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      });
      
      if(response.ok) {
        setWeather( await response.json());
      } else {
        let text = await response.text();
        alert("Code " + response.status + ", message: " + text);
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

  return <div>
    <p>Protected page. Secret Weather (works with authenticated users, who have special HttpOnly cookies):</p>
    { weather.map(w => <p> in {w.date} the weather will be {w.temperatureC} in censium degree </p>) }
  </div>;
}

export default App;
