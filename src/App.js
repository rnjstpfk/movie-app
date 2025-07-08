
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Header from './components/Header';



function App() {
  return (
    <div className="App">
        <Header></Header>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/detail' element={<Detail />}/>
        </Routes>
    </div>
  );
}

export default App;
