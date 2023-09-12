import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Login } from "./pages/login";
import { Navbar } from "./components/navbar";
import { CreatePost } from "./pages/create-post/create-post";
// import { profile } from './ChangeProfile';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
