import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { iTask } from '../../models/task';
import { Task } from './task';

import { useTasks } from '../../hooks/use.tasks';

jest.mock('../../hooks/use.tasks');

describe('Given Task component', () => {
    describe('When it has been instantiate with some task data', () => {
        let task: iTask;
        let jsx: JSX.Element;
        beforeEach(() => {
            // arrange
            task = {
                id: '1',
                title: 'Test task',
                responsible: 'Pepe',
                isCompleted: true,
            };
            jsx = <Task task={task} />;
            (useTasks as jest.Mock).mockReturnValue({
                completeTask: jest.fn(),
                deleteTask: jest.fn(),
            });
        });
        test('Then it renders the provided task', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByText(task.title);
            expect(element).toBeInTheDocument();
        });
        test('Then if user check "complete", the handle ... should be run', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByRole('checkbox');
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            expect(useTasks().completeTask).toHaveBeenCalled();
        });
        test('Then if user click "delete", the handle ... should be run', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByRole('button');
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            expect(useTasks().deleteTask).toHaveBeenCalled();
        });
    });
});
