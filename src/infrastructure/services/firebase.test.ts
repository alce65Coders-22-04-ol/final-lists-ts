import { startFirebase } from './firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

jest.mock('firebase/app');
jest.mock('firebase/database');
jest.mock('firebase/firestore');

describe('Given startFirebase service', () => {
    describe('When it is call', () => {
        test('Then firebase services should be call', () => {
            // act
            startFirebase();
            // assert
            expect(initializeApp).toHaveBeenCalled();
            expect(getDatabase).toHaveBeenCalled();
            expect(getFirestore).toHaveBeenCalled();
        });
    });
});
