import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from './redux/actions/accountActions';
import './styles/App.css';
import AuthPage from './components/AuthPage/AuthPage';
import EmailPage from './components/EmailPage/EmailPage';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.userReducer);

  // if a token exists, try to get the user data from the server,
  // if this fetch has succeeded, App will Navigate us to the emails page
  // if this fetch failed, that means the token has expired and the user needs to login
  
  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/'>
            {!isLoggedIn ? <Navigate to='/account' /> : <Navigate to='/email/inbox' />}
          </Route>

          <Route exact path='/account'>
            {!isLoggedIn ? <AuthPage /> : <Navigate to='/email/inbox' />}
          </Route>

          <Route path='/email'>
            {/* This route has multiple sub-routes */}
            {isLoggedIn ? <EmailPage /> : <Navigate to='/account' />}
          </Route>

          <Route exact path='/GitHub'
            component={() => (window.location.href = 'https://github.com/sivasankar-jayavel')}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
