import { startFirebase } from './firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

jest.mock('firebase/app');
jest.mock('firebase/database');

describe('Given startFirebase service', () => {
    describe('When it is call', () => {
        test('Then firebase services should be call', () => {
            // act
            startFirebase();
            // assert
            expect(initializeApp).toHaveBeenCalled();
            expect(getDatabase).toHaveBeenCalled();
        });
    });
});
