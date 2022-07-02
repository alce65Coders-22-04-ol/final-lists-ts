import { useState } from 'react';
import { Counter } from '../components/counter/counter';
import { CounterClicks } from '../components/counter/counter-clicks';
import { CounterStates } from '../components/counter/counter-states';

import home from './home.module.css';

function HomePage() {
    const [totalClicks, setTotalClicks] = useState(0);

    const addClick = () => {
        setTotalClicks(totalClicks + 1);
    };

    return (
        <>
            <h2>Página Home</h2>
            <p>Total clicks: {totalClicks}</p>
            <div className={home.counters}>
                <Counter setTT={addClick}></Counter>
                <CounterClicks setTT={addClick}></CounterClicks>
                <CounterStates setTT={addClick}></CounterStates>
            </div>
        </>
    );
}

export default HomePage;