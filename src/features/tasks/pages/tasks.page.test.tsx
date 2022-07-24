import { render, screen } from '@testing-library/react';
import { getDatabase, get } from 'firebase/database';
import TasksPage from './tasks.page';

jest.mock('firebase/database');

describe('Given Tasks Page component', () => {
    describe('When it has been instantiate', () => {
        test('Then it renders title page', () => {
            // arrange
            getDatabase as jest.Mock;
            (get as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(true),
                val: jest.fn().mockReturnValue({}),
            });
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
