import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';
// import protectedRoute from './protected.route.module.css'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isLogged } = useContext(AppContext);

    return isLogged ? children : <Navigate to="home" replace={true} />;
}
