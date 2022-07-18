import { render, screen } from '@testing-library/react';
import { appOptionsType } from '../../../infrastructure/interfaces/app.options';
import { Layout } from './layout';

describe('Given Layout component', () => {
    describe('When it has been instantiate with a content', () => {
        test('Then it renders that content', () => {
            // arrange
            const content = 'Testing content';
            const appTitle = '';
            const company = '';
            const appOptions: appOptionsType = [];
            const jsx = (
                <Layout
                    appTitle={appTitle}
                    company={company}
                    appOptions={appOptions}
                >
                    <p>{content}</p>
                </Layout>
            );
            // act
            render(jsx);
            // assert
            const element = screen.getByText(content);
            expect(element).toBeInTheDocument();
        });
    });
});
