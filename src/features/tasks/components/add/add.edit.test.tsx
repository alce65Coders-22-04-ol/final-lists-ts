import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddOrEdit } from './add.edit';

import { useTasks } from '../../hooks/use.tasks';

jest.mock('../../hooks/use.tasks');

const mockTask = {
    id: '1',
    title: 'Test task 1',
    responsible: 'Pepe',
    isCompleted: false,
};

describe('Given the component Add', () => {
    describe('When the component is rendered in "add" mode', () => {
        beforeEach(() => {
            (useTasks as jest.Mock).mockReturnValue({
                getContext: jest.fn().mockReturnValue({ taskToEdit: null }),
                addTask: jest.fn(),
            });
        });
        test('Then inputs should be completed and data send to addTask function', () => {
            render(<AddOrEdit></AddOrEdit>);
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

    describe('When the component is rendered in "edit" mode', () => {
        beforeEach(() => {
            (useTasks as jest.Mock).mockReturnValue({
                getContext: jest.fn().mockReturnValue({ taskToEdit: mockTask }),
                updateTask: jest.fn(),
            });
        });
        test('Then inputs should be updated and data send to updateTask function', () => {
            render(<AddOrEdit></AddOrEdit>);
            const inputs = screen.getAllByRole('textbox');
            expect(inputs[0]).toBeInTheDocument();
            expect(inputs[1]).toBeInTheDocument();
            userEvent.clear(inputs[0]);
            userEvent.type(inputs[0], 'Update Test task 1');
            userEvent.clear(inputs[1]);
            userEvent.type(inputs[1], 'Luisa');
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            userEvent.click(button);
            expect(useTasks().updateTask).toHaveBeenCalledWith('1', {
                title: 'Update Test task 1',
                responsible: 'Luisa',
                isCompleted: false,
            });
        });
    });
});
