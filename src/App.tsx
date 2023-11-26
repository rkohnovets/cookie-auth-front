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

import PublicPage from "./components/pages/PublicPage";
import ProtectedPage from "./components/pages/ProtectedPage";

const App = () => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
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

export default App;
