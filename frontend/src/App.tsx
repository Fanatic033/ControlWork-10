import './App.css'
import Header from './UI/Header/Header.tsx';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NewsList from './features/News/NewsList.tsx';
import AddNew from './features/News/AddNew.tsx';
import OneNewInfo from './features/News/OneNewInfo.tsx';

const App = () => (
  <>
    <header>
      <Header/>
    </header>
    <Container maxWidth="xl" component="main">
      <Routes>
        <Route path="/" element={<NewsList/>}/>
        <Route path="/news/add" element={<AddNew/>}/>
        <Route path="news/:id" element={<OneNewInfo/>}/>
      </Routes>
    </Container>

  </>
);

export default App
