import { render, screen } from '@testing-library/react';
import { startFirebase } from '../../../infrastructure/services/firebase';
import TasksPage from './tasks';

describe('Given Tasks Page component', () => {
    describe('When it has been instantiate', () => {
        test('Then it renders title page', () => {
            // arrange
            startFirebase();
            const title = 'Página Tasks';
            const jsx = <TasksPage title={title} />;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
