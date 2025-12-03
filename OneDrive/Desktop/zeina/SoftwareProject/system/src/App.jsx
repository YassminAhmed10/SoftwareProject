import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  console.log('Current Page:', currentPage);

  return (
    <div className="app-container">
      {currentPage === 'login' ? (
        <LoginPage onNavigateToSignup={() => {
          console.log('Navigating to signup'); 
          setCurrentPage('signup');
        }} />
      ) : (
        <SignUpPage onNavigateToLogin={() => {
          console.log('Navigating to login'); 
          setCurrentPage('login');
        }} />
      )}
    </div>
  );
}

export default App;