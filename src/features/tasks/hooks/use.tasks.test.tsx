import { act, render, waitFor } from '@testing-library/react';
import { useTasks } from './use.tasks';
import { RTFirebaseRepository } from '../../../infrastructure/repositories/RTFirebase.repository';
import { TaskModel } from '../models/task.model';
import { TaskContext } from '../context/context';
import { getDatabase } from 'firebase/database';
import { useEffect, useState } from 'react';

jest.mock('../../../infrastructure/repositories/RTFirebase');
jest.mock('firebase/database');

describe('Given useTasks hook inside a TestElement', () => {
    let TestElement: Function;
    let TestContextProvider: Function;
    let tasks: Array<TaskModel>;
    let isLoading: boolean;
    let taskToEdit: TaskModel | null;
    let jsx: JSX.Element;
    let externalContextData: {
        tasks: Array<TaskModel>;
        isLoading: boolean;
        taskToEdit: TaskModel | null;
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
                tasks: Array<TaskModel>;
                isLoading: boolean;
                taskToEdit: null;
            };
        }) => {
            const [tasks, setTasks] = useState(initialData.tasks);
            const [isLoading, setIsLoading] = useState(initialData.isLoading);
            const [taskToEdit, setTaskToEdit] = useState(
                null as TaskModel | null
            );

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

        test('Then it take the values from the context', async () => {
            // act
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                // formato usado para corregir el warning
                render(jsx);
            });
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
                useEffect(() => {
                    hook.startToEditTask(taskData1);
                }, [hook]);

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
            RTFirebaseRepository.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue([taskData1]);
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                useEffect(() => {
                    hook.loadTasks();
                }, [hook]);
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
            expect(
                RTFirebaseRepository.prototype.getAllItems
            ).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks).toStrictEqual([taskData1]);
            });
        });
    });

    describe('When its function addTask has been used in a component', () => {
        let newTask: TaskModel;
        beforeEach(() => {
            // arrange
            newTask = {
                id: '2',
                title: 'Added Test task',
                responsible: 'Ernesto',
                isCompleted: false,
            };
            RTFirebaseRepository.prototype.addItem = jest
                .fn()
                .mockResolvedValue(newTask);
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                useEffect(() => {
                    hook.addTask(newTask);
                }, [hook]);
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
            expect(RTFirebaseRepository.prototype.addItem).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks[1]).toStrictEqual(newTask);
            });
        });
    });

    describe('When its function updateTask has been used in a component', () => {
        beforeEach(() => {
            // arrange

            const expectedData = { ...taskData1, isCompleted: true };
            RTFirebaseRepository.prototype.updateItem = jest
                .fn()
                .mockResolvedValue(expectedData);
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                useEffect(() => {
                    hook.updateTask(taskData1.id, { isCompleted: true });
                }, [hook]);
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
            expect(
                RTFirebaseRepository.prototype.updateItem
            ).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks[0].isCompleted).toBe(true);
            });
        });
    });

    describe('When its function deleteTask has been used in a component', () => {
        beforeEach(() => {
            // arrange
            RTFirebaseRepository.prototype.deleteItem = jest
                .fn()
                .mockResolvedValue({});
            TestElement = () => {
                const hook = useTasks();
                ({ tasks, isLoading } = hook.getContext());
                useEffect(() => {
                    hook.deleteTask(taskData1.id);
                });
                return <></>;
            };
            externalContextData.tasks = [taskData1];
            externalContextData.isLoading = false;
            jsx = (
                <TestContextProvider initialData={externalContextData}>
                    <TestElement></TestElement>;
                </TestContextProvider>
            );
        });
        test('The repository function deleteData should be call', async () => {
            // act

            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                // formato usado para corregir el warning que aparece al final
                render(jsx);
            });
            // assert
            expect(
                RTFirebaseRepository.prototype.deleteItem
            ).toHaveBeenCalled();
            await waitFor(() => {
                expect(tasks).toStrictEqual([taskData1]);
            });
        });
    });
});
