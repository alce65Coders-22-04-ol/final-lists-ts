import { render, screen } from '@testing-library/react';
import TasksPage from './tasks';

describe('Given Tasks Page component', () => {
    describe('When it has been instantiate', () => {
        test('Then it renders title page', () => {
            // arrange
            const title = 'Página Tasks';
            const jsx = <TasksPage />;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
