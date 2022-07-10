import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { iTask } from '../models/task';

import { TaskContext, initialContext } from './context';

describe('Given the context AppContext', () => {
    let TestComponent: Function;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            initialContext.setTask([]);
            initialContext.setIsLoading(false);
            const task: iTask = {
                id: '1',
                title: 'Test task',
                responsible: 'Pepe',
                isCompleted: true,
            };
            initialContext.tasks = [task];
            TestComponent = () => {
                const { tasks } = useContext(TaskContext);
                return <>{tasks[0].title}</>;
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <TaskContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </TaskContext.Provider>
            );
            const element = screen.getByText(
                initialContext.tasks[0].title as string
            );
            expect(element).toBeInTheDocument();
        });
    });
});
