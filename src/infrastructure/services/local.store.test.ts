import { LocalStore } from './local.store';

describe('Given an instance of service LocalStore', () => {
    let ls: LocalStore<{ test: string }>;
    let data: { test: string };

    beforeEach(() => {
        ls = new LocalStore('Test');
        data = { test: 'Test Data' };
    });
    describe('When the method getItem is used, and no data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            ls.getItem();
            // assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });
    describe('When the method getItem is used, and some data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify(data));
            // act
            ls.getItem();
            // assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });
    describe('When the method getItems is used, and no data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            ls.getItems();
            // assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });
    describe('When the method getItems is used, and some data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify([data]));
            // act
            ls.getItems();
            // assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });
    describe('When the method setItem is used', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.setItem = jest.fn();
            // act
            ls.setItem(data);
            // assert
            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });
    describe('When the method setItems is used', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.setItem = jest.fn();
            // act
            ls.setItems([data]);
            // assert
            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });
    describe('When the method removeItems is used', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.removeItem = jest.fn();
            // act
            ls.removeItems();
            // assert
            expect(localStorage.removeItem).toHaveBeenCalled();
        });
    });
});
