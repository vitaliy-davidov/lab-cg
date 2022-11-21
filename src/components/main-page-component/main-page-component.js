import './main-page-component.css';

const MainPage = () => {
  return (
    <div className='content-container'>
      <div>
        <a href="/help" className="help-btn">?</a>
      </div>
      <div className='main-logo-wrapper'>
        <img src="/images/logo.png" alt="Logo" height="100%"/>
      </div>
      <div className='main-nav-container'>
        <a href="/fractals" className="main-nav-btn">
          <img src="/images/fractal.png" height="100%" alt="Fractals"/>
        </a>
        <a href="/color-scheme" className="main-nav-btn">
          <img src="/images/color-scheme.png" height="100%" alt="Color Scheme"/>
        </a>
        <a href="/transform" className="main-nav-btn">
          <img src="/images/transform.png" height="100%" alt="Transform"/>
        </a>
      </div>
    </div>
  );
}

export default MainPage;
