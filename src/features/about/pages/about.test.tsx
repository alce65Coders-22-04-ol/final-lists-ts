import { render, screen } from '@testing-library/react';
import AboutPage from './about';

describe('Given About Page component', () => {
    describe('When it has been instantiate', () => {
        test('Then it renders title page', () => {
            // arrange
            const title = 'Página About';
            const jsx = <AboutPage title={title} />;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
