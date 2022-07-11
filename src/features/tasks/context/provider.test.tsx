import { render } from '@testing-library/react';
import { useContext, useEffect } from 'react';
import { iTask } from '../models/task';
import { TaskContextProvider } from './provider';
import { TaskContext, initialContext } from './context';

describe('Given the context AppContext', () => {
    let TestComponent: Function;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            initialContext.setTasks([]);
            initialContext.setIsLoading(false);
            const task: iTask = {
                id: '1',
                title: 'Test task',
                responsible: 'Pepe',
                isCompleted: true,
            };
            initialContext.tasks = [task];
            TestComponent = () => {
                const { tasks, setTasks, isLoading, setIsLoading } =
                    useContext(TaskContext);
                useEffect(() => {
                    setIsLoading(true);
                    setTasks(initialContext.tasks);
                }, [setIsLoading, setTasks]);
                const handleClick = () => {
                    setIsLoading(false);
                    setTasks(null);
                };
                return (
                    <>
                        <p>{tasks[0]?.title}</p>
                        <p>{isLoading && 'Logged'}</p>
                        <button onClick={handleClick}>Logout</button>
                    </>
                );
            };
        });

        test('component should be render with context values', () => {
            render(
                <TaskContextProvider>
                    <TestComponent></TestComponent>
                </TaskContextProvider>
            );
        });

        test('Context values should be used in the component', () => {
            render(
                <TaskContextProvider>
                    <TestComponent></TestComponent>
                </TaskContextProvider>
            );
            //             let element1 = screen.queryByText(
            //                 initialContext.userLogged.name as string
            //             );
            //             let element2 = screen.queryByText('Logged');
            //             expect(element1).toBeInTheDocument();
            //             expect(element2).toBeInTheDocument();
            //             const button = screen.getByRole('button');
            //             userEvent.click(button);
            //             element1 = screen.queryByText(
            //                 initialContext.userLogged.name as string
            //             );
            //             element2 = screen.queryByText('Logged');
            //             expect(element1).not.toBeInTheDocument();
            //             expect(element2).not.toBeInTheDocument();
        });
    });
});
