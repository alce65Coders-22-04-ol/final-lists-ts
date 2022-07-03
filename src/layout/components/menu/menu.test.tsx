import { render, screen } from '@testing-library/react';
import { menuOptionsType } from '../../interfaces/menu-options';
import { Menu } from './menu';

describe('Given Menu component', () => {
    describe('When it has been instantiate with some menuOptions', () => {
        test('Then it renders the menu options', () => {
            // arrange
            const label = 'Test Page';
            const menuOptions: menuOptionsType = [
                { path: './test.html', label },
            ];
            const jsx = <Menu menuOptions={menuOptions}></Menu>;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(label);
            expect(element).toBeInTheDocument();
        });
    });
});
