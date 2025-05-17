import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import JoinForm from './components/JoinForm';
import './App.css';

function Home() {
  return (
    <div className="intro-text">
      <p>
        At <strong>Snappy AI</strong>, our mission is simple: We help businesses, schools, hospitals, and governments upgrade their systems using smart automation and artificial intelligence.
      </p>
      <p>
        From streamlining repetitive tasks to building intelligent tools that save time and money, we believe AI should be accessible, practical, and impactful — especially in Africa.
      </p>
      <p>
        We're building a team of doers — creative thinkers, problem-solvers, and automation experts — and that's why this challenge exists.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <h1 className="app-title">Snappy AI</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/form">Lead Form</Link>
            <Link to="/join">Join Us</Link>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/join" element={<JoinForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
