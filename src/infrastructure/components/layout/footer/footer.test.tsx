import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Given Footer component', () => {
    describe('When it has been instantiate', () => {
        test('Then it renders the company name', () => {
            // arrange
            const company = 'Test company';
            const jsx = <Footer company={company}></Footer>;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(company);
            expect(element).toBeInTheDocument();
        });
    });
});
