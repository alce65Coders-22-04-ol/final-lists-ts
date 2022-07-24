import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Given Header component', () => {
    describe('When it has been instantiate with a content', () => {
        let content: string;
        let imgAlt: string;
        let appTitle: string;
        let jsx: JSX.Element;
        beforeEach(() => {
            // arrange
            content = 'Test content';
            imgAlt = 'logo';
            appTitle = 'Test title';
            jsx = (
                <Header appTitle={appTitle}>
                    <p>{content}</p>
                </Header>
            );
        });
        test('Then it renders image', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByAltText(imgAlt);
            expect(element).toBeInTheDocument();
        });
        test('Then it renders title', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByText(appTitle);
            expect(element).toBeInTheDocument();
        });
        test('Then it renders content', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByText(content);
            expect(element).toBeInTheDocument();
        });
    });
});
