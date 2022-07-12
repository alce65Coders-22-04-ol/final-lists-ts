import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddOrEdit } from './add';

import { useTasks } from '../../hooks/use.tasks';

jest.mock('../../hooks/use.tasks');

describe('Given the component Add', () => {
    beforeEach(() => {
        (useTasks as jest.Mock).mockReturnValue({
            getContext: jest.fn().mockReturnValue({ taskToEdit: null }),
            addTask: jest.fn(),
            deleteTask: () => {},
            completeTask: () => {},
        });
    });
    describe('When the component is rendered', () => {
        test('Then inputs should be completed and data send to addTask function', () => {
            render(
                // <Router>
                <AddOrEdit></AddOrEdit>
                // </Router>
            );
            const inputs = screen.getAllByRole('textbox');
            expect(inputs[0]).toBeInTheDocument();
            expect(inputs[1]).toBeInTheDocument();
            userEvent.type(inputs[0], 'Tarea');
            userEvent.type(inputs[1], 'Pepe');
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            userEvent.click(button);
            expect(useTasks().addTask).toHaveBeenCalledWith({
                title: 'Tarea',
                responsible: 'Pepe',
                isCompleted: false,
            });
        });
    });
});
