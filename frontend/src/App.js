import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/create" element={ <Form /> } />
          <Route exact path="/edit/:id" element={ <Form /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
