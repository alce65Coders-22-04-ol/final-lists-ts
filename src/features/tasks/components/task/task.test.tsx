import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskModel } from '../../models/task.model';
import { Task } from './task';

import { useTasks } from '../../hooks/use.tasks';

jest.mock('../../hooks/use.tasks');

describe('Given Task component', () => {
    describe('When it has been instantiate with some task data', () => {
        let task: TaskModel;
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
                updateTask: jest.fn(),
                deleteTask: jest.fn(),
                startToEditTask: jest.fn(),
            });
        });
        test('Then it renders the provided task', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByText(task.title);
            expect(element).toBeInTheDocument();
        });
        describe('And the user check "complete" button', () => {
            test(`Then the handle handleChange should be run, 
                    and it call a method in the custom hook for update a task`, () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByRole('checkbox');
                expect(element).toBeInTheDocument();
                userEvent.click(element);
                expect(useTasks().updateTask).toHaveBeenCalled();
            });
        });
        describe('And the user click "edit"  button', () => {
            test(`Then the handle handleClick(edit) should be run
                and it call a method in the custom hook for update a task`, () => {
                // act`, () => {
                // act
                render(jsx);
                // assert
                const elements = screen.getAllByRole('button');
                expect(elements[0]).toBeInTheDocument();
                userEvent.click(elements[0]);
                expect(useTasks().startToEditTask).toHaveBeenCalled();
            });
        });
        describe('And the user click "delete" button', () => {
            test(`Then the handle handleClick(delete) should be run
                and it call a method in the custom hook for update a task`, () => {
                // act
                render(jsx);
                // assert
                const elements = screen.getAllByRole('button');
                expect(elements[1]).toBeInTheDocument();
                userEvent.click(elements[1]);
                expect(useTasks().deleteTask).toHaveBeenCalled();
            });
        });
    });
});
