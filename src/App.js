import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import { ResumeProvider } from './context/ResumeContext';
import MinimalResume from './pages/SampleResumes/MinimalResume';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MinimalResume />} path='/minimal-resume' />
          <Route element={<Builder />} path='/app' />
          <Route element={<Home />} path='/' />

        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;