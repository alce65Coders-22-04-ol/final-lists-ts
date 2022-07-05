import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import { AppContext, initialContext } from './context';

describe('Given the context AppContext', () => {
    let TestComponent: Function;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            initialContext.userLogged.name = 'Pepe';
            TestComponent = () => {
                const { userLogged } = useContext(AppContext);
                return <>{userLogged.name}</>;
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <AppContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </AppContext.Provider>
            );
            const element = screen.getByText(
                initialContext.userLogged.name as string
            );
            expect(element).toBeInTheDocument();
        });
    });
});
