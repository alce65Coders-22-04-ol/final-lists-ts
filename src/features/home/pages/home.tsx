import { useState } from 'react';
import { Counter } from '../components/counter/counter';
import { CounterClicks } from '../components/counter-clicks/counter-clicks';
import { CounterStates } from '../components/counter-states/counter-states';

import home from './home.module.css';

function HomePage({ title }: { title: string }) {
    const [totalClicks, setTotalClicks] = useState(0);

    const addClick = () => {
        setTotalClicks(totalClicks + 1);
    };

    return (
        <section>
            <h2>{title}</h2>
            <p>Total clicks: {totalClicks}</p>
            <div className={home.counters}>
                <Counter setTT={addClick}></Counter>
                <CounterClicks setTT={addClick}></CounterClicks>
                <CounterStates setTT={addClick}></CounterStates>
            </div>
        </section>
    );
}

export default HomePage;
