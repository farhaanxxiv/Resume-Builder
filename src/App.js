import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import { ResumeProvider } from './context/ResumeContext';
import MinimalResume from './pages/SampleResumes/MinimalResume';
import { AuthProvider } from './context/AuthContext';
import MyResumes from './pages/MyResumes';
import { ThemeProvider } from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<MinimalResume />} path='/minimal-resume' />
              <Route element={<Builder />} path='/app/builder/:id' />
              <Route element={<MyResumes />} path='/app' />
              <Route element={<Home />} path='/' />

            </Routes>
          </BrowserRouter>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
