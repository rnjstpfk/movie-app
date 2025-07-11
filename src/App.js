
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import Home from "./routes/Home";
import About from "./routes/About";
import Drama from "./routes/Detail";
import MoviesDetail from "./routes/MoviesDetail";
import DramaDetail from './routes/DramaDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickBtn from './components/QuickBtn';



function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/drama' element={<Drama />} />
          <Route path='/drama/:id' element={<DramaDetail />} />
          <Route path='/movies/:id' element={<MoviesDetail />} />
        </Routes>
      </main>
      <Footer />
      <QuickBtn />
    </div>
  );
}


export default App;
