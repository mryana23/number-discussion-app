import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostTree from './components/Post/PostTree';
import CreatePost from './components/Post/CreatePost';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // In a real app, you'd validate the token with the server
    }
  }, []);

  const handleLogin = (token: string, user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
  };

  const handleRegister = (token: string, user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername('');
  };

  const handlePostCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Number Discussion App</h1>
        {isAuthenticated && (
          <div>
            <span style={{ marginRight: '15px' }}>Welcome, {username}!</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {!isAuthenticated && (
          <div style={{ marginBottom: '30px' }}>
            {showLogin ? (
              <Login
                onLogin={handleLogin}
                onSwitchToRegister={() => setShowLogin(false)}
              />
            ) : (
              <Register
                onRegister={handleRegister}
                onSwitchToLogin={() => setShowLogin(true)}
              />
            )}
          </div>
        )}

        {isAuthenticated && (
          <CreatePost onPostCreated={handlePostCreated} />
        )}

        <PostTree 
          isAuthenticated={isAuthenticated}
          refreshTrigger={refreshTrigger}
        />
      </main>
    </div>
  );
}

export default App;