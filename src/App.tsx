import { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Register from './views/Register';
import { CategoryType } from './types';

export default function App() {

  const [message, setMessage] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<CategoryType | undefined>(undefined);


  const flashMessage = (newMessage: string | undefined, newCategory: CategoryType | undefined) => {
    setMessage(newMessage);
    setCategory(newCategory);
  }


  return (
    <>
      <Navigation/>
        <Container>
          {/* Displays the flash message if there is one */}
          {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
          <Routes>
            <Route path='/' element={<Home flashMessage={flashMessage}/>} />
            <Route path='/register' element={<Register flashMessage={flashMessage} />} />
          </Routes>
        </Container>
    </>
  );
}