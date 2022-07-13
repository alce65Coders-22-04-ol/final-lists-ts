import { render, waitFor } from '@testing-library/react';
import { useTasks } from './use.tasks';
import { Repository } from '../../../infrastructure/repositories/RTFirebase';
import { iTask } from '../models/task';
import { TaskContext } from '../context/context';
import { getDatabase } from 'firebase/database';
import { useState } from 'react';

jest.mock('../../../infrastructure/repositories/RTFirebase');
jest.mock('firebase/database');

describe('Given useTasks hook inside a TestElement', () => {
    let TestElement: Function;
    let TestContextProvider: Function;
    let tasks: Array<iTask>;
    let isLoading: boolean;
    let taskToEdit: iTask | null;
    let jsx: JSX.Element;
    let externalContextData: {
        tasks: Array<iTask>;
        isLoading: boolean;
        taskToEdit: iTask | null;
    };

    const taskData1 = {
        id: '1',
        title: 'Test task 1',
        responsible: 'Pepe',
        isCompleted: false,
    };

    const taskData2 = {
        id: '2',
        title: 'Test task 2',
        responsible: 'Luisa',
        isCompleted: false,
    };

    beforeEach(() => {
        TestContextProvider = ({
            children,
            initialData,
        }: {
            children: JSX.Element;
            initialData: {
                tasks: Array<iTask>;
                isLoading: boolean;
                taskToEdit: null;
            };
        }) => {
            const [tasks, setTasks] = useState(initialData.tasks);
            const [isLoading, setIsLoading] = useState(initialData.isLoading);
            const [taskToEdit, setTaskToEdit] = useState(null);

            const context = {
                tasks,
                setTasks,
                isLoading,
                setIsLoading,
                taskToEdit,
                setTaskToEdit,
            };

            return (
                <TaskContext.Provider value={context}>
                    {children}
                </TaskContext.Provider>
            );
        };
        externalContextData = {
            tasks: [],
            isLoading: false,
            taskToEdit: null,
        };
    });

    describe('When its function getContext has been used in a component', () => {
        beforeEach(() => {
            // arrange
            (getDatabase as jest.Mock).mockReturnValue({});

            TestElement = () => {
                // se toman del hook todos sus métodos
                const hook = useTasks();
                // uno de ellos permite acceder a los datos del contexto
                ({ tasks, isLoading } = hook.getContext());
                // en el contexto estarán definidos los estados y sus setters
                return <></>;
            };

            externalContextData.tasks = [taskData1, taskData2];
            externalContextData.isLoading = false;
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });

        test('Then it take the values from the context', () => {
            // act
            render(jsx);
            // assert
            expect(tasks).toStrictEqual(externalContextData.tasks);
            expect(isLoading).toBe(externalContextData.isLoading);
        });
    });

    describe('When its function startToEditTask has been used in a component', () => {
        beforeEach(() => {
            // arrange
            (getDatabase as jest.Mock).mockReturnValue({});

            TestElement = () => {
                // se toman del hook todos sus métodos
                const hook = useTasks();
                // uno de ellos permite acceder a los datos del contexto
                ({ taskToEdit } = hook.getContext());
                // en el contexto estarán definidos los estados y sus setters
                hook.startToEditTask(taskData1);
                return <></>;
            };

            externalContextData.taskToEdit = null;
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });

        test('Then it set the value taskToEdit from the context', async () => {
            // act
            render(jsx);
            // assert
            expect(taskToEdit).toStrictEqual(taskData1);
        });
    });

    describe('When its function loadTasks has been used in a component', () => {
        beforeEach(() => {
            // arrange
            Repository.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue([taskData1]);
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                hook.loadTasks();
                return <></>;
            };
            externalContextData.tasks = [];
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });
        test('The repository function getAllData should be call', async () => {
            // act
            render(jsx);
            // assert
            // expect(tasks).toStrictEqual([]);
            expect(Repository.prototype.getAllItems).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks).toStrictEqual([taskData1]);
            });
        });
    });

    describe('When its function addTask has been used in a component', () => {
        let newTask: iTask;
        beforeEach(() => {
            // arrange
            newTask = {
                id: '2',
                title: 'Added Test task',
                responsible: 'Ernesto',
                isCompleted: false,
            };
            Repository.prototype.addItem = jest.fn().mockResolvedValue(newTask);
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                hook.addTask(newTask);
                return <></>;
            };
            externalContextData.tasks = [taskData1];
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });
        test('The repository function setListData should be call', async () => {
            // act
            render(jsx);
            // assert
            expect(tasks).toStrictEqual([taskData1]);
            expect(Repository.prototype.addItem).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks[1]).toStrictEqual(newTask);
            });
        });
    });

    describe('When its function updateTask has been used in a component', () => {
        beforeEach(() => {
            // arrange

            const expectedData = { ...taskData1, isCompleted: true };
            Repository.prototype.updateItem = jest
                .fn()
                .mockResolvedValue(expectedData);
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                hook.updateTask(taskData1.id, { isCompleted: true });
                return <></>;
            };
            externalContextData.tasks = [taskData1, taskData2];
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });
        test('The repository function updateData should be call', async () => {
            // act
            render(jsx);
            // assert
            expect(Repository.prototype.updateItem).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks[0].isCompleted).toBe(true);
            });
        });
    });

    describe('When its function deleteTask has been used in a component', () => {
        beforeEach(() => {
            // arrange
            Repository.prototype.deleteItem = jest.fn().mockResolvedValue({});
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                hook.deleteTask(taskData1.id);
                return <></>;
            };
            externalContextData.tasks = [taskData1];
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });
        test('The repository function deleteData should be call', () => {
            // act
            render(jsx);
            // assert
            expect(Repository.prototype.deleteItem).toHaveBeenCalled();
            expect(tasks).toStrictEqual([taskData1]);
        });
    });
});
