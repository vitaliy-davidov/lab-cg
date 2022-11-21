import './nav-bar-component.css'

const NavBar = ({selectedPageName}) => {

    const getNavButtonClases = (name) => {
        var classString = 'nav-btn';
        if(name.toLowerCase() === selectedPageName.toLowerCase()) {
            classString += ' nav-btn-selected';
        }
        return classString
    }

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <a href='/'>
                    <img src='/images/logo-mini.png' height="100%" alt='logo'/>
                </a>
            </div>
            <div className='nav-btn-container'>
                <a href='/fractals' className={getNavButtonClases('fractals')}>Fractal</a>
                <a href='/color-scheme' className={getNavButtonClases('color-scheme')}>Color Scheme</a>
                <a href='/transform' className={getNavButtonClases('transform')}>Transform</a>
                <a href='/help' className={getNavButtonClases('help')} style={{fontWeight: 'bold', fontSize: '1.4rem'}}>?</a>
            </div>
        </div>
    );
}

export default NavBar;