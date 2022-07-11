import { render, screen } from '@testing-library/react';
import { useTasks } from '../../hooks/use.tasks';

import { List } from './list';

jest.mock('../../hooks/use.tasks');

const mockContext = {
    tasks: [{ id: '1', title: 'Test', responsible: '', isCompleted: false }],
    isLoading: false,
    setTask: () => {},
    setIsLoading: () => {},
};

describe('first', () => {
    beforeEach(() => {
        (useTasks as jest.Mock).mockReturnValue({
            getContext: jest.fn().mockReturnValue(mockContext),
            loadTasks: jest.fn(),
        });
    });
    test('when is loading should render "loading"', () => {
        mockContext.isLoading = true;
        render(<List></List>);
        const element = screen.getByText(/Loading/i);
        expect(element).toBeInTheDocument();
    });
    test('when is loaded, should render the list', () => {
        mockContext.isLoading = false;
        render(<List></List>);
        const element = screen.getByText(/Test/i);
        expect(element).toBeInTheDocument();
    });
});
