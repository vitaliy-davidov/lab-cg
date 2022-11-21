import NavBar from '../nav-bar-component/nav-bar-component';
import './navigation-wrapper-component.css'

const NavigationWrapper = ({children, name}) => {
    return (
        <>
            <NavBar selectedPageName={name}/>
            {children}
        </>
    );
}

export default NavigationWrapper;