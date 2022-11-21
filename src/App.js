import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/main-page-component/main-page-component.js'
import './App.css';
import NavigationWrapper from './components/navigation-wrapper-component/navigation-wrapper-component.js';
import FractalsPage from './components/fractals-page-component/fractals-page-component.js';
import ColorSchemePage from './components/color-scheme-page-component/color-scheme-page-component.js';
import TransformationPage from './components/transformation-page-component/transformation-page-component.js';

function App() {
  return (
    <div className='main-content'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<MainPage/>} />
          <Route exact path='/fractals' element={<NavigationWrapper name={'fractals'}><FractalsPage/></NavigationWrapper>} />
          <Route exact path='/color-scheme' element={<NavigationWrapper name={'color-scheme'}><ColorSchemePage/></NavigationWrapper>} />
          <Route exact path='/transform' element={<NavigationWrapper name={'transform'}><TransformationPage/></NavigationWrapper>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
