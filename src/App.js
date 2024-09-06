import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Welcome from './pages/Welcome'; // Import the Welcome component
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = '/login';
      })
      .catch(error => {
        console.error('Sign out error', error);
      });
  };

  return (
    <Router>
      <MainLayout isAuth={isAuth} signUserOut={signUserOut}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

function MainLayout({ children, isAuth, signUserOut }) {
  const location = useLocation();
  const hideNavBar = location.pathname === '/';

  return (
    <>
      {!hideNavBar && (
        <nav>
          <Link to="/home"> Home </Link>
          {!isAuth ? (
            <Link to="/login"> Login </Link>
          ) : (
            <>
              <Link to="/createpost"> Create Post </Link>
              <button onClick={signUserOut}> Log Out</button>
            </>
          )}
        </nav>
      )}
      {children}
    </>
  );
}

export default App;
