import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/context';

/**
 * @name: ProtectedRoute
 * @type: Component
 * @description: Component Responsibilities
 * @see: ## Renderización:
 *  - si el usuario está logado, renderiza el componente que le llega como children
 *  - si el usuario no está logado, navega a la ruta home
 * @event: ## Respuesta a eventos:
 *  - ninguna
 * @external: ## Testing
 *  - indirectamente, al testear las rutas en el componente appRoutes
 * @param param0: children prop
 * @returns: JSX.Element
 */
export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isLogged } = useContext(AppContext);

    return isLogged ? children : <Navigate to="home" replace={true} />;
}
