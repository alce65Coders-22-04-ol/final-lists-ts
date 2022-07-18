import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { appOptionsType } from '../../../infrastructure/interfaces/app.options';
import { Menu } from './menu';

describe('Given Menu component', () => {
    describe('When it has been instantiate with some appOptions', () => {
        test('Then it renders the menu options', () => {
            // arrange
            const label = 'Test Page';
            const appOptions: appOptionsType = [
                { path: './test.html', label, title: label },
            ];
            const jsx = (
                <Router>
                    <Menu appOptions={appOptions}></Menu>
                </Router>
            );
            // act
            render(jsx);
            // assert
            const element = screen.getByText(label);
            expect(element).toBeInTheDocument();
        });
    });
});
