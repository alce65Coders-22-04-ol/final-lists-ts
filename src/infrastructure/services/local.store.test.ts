import { LocalStore } from './local.store';

describe('Given an instance of service LocalStore', () => {
    interface iData {
        test: string;
    }

    let ls: LocalStore<iData>;
    let data: iData;
    let storeName: string;
    beforeEach(() => {
        storeName = 'Test';
        ls = new LocalStore(storeName);
        data = { test: 'Test Data' };
    });

    describe('When the method getItem is used, and no data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            const result = ls.getItem();
            // assert
            expect(localStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toBeNull();
        });
    });

    describe('When the method getItem is used, and some data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify(data));
            // act
            // act
            const result = ls.getItem();
            // assert
            expect(localStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toStrictEqual(data);
        });
    });

    describe('When the method getItems is used, and no data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            const result = ls.getItems();
            // assert
            expect(localStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toStrictEqual([]);
        });
    });

    describe('When the method getItems is used, and some data is obtained', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify([data]));
            // act
            const result = ls.getItems();
            // assert
            expect(localStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toStrictEqual([data]);
        });
    });

    describe('When the method setItem is used', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.setItem = jest.fn();
            let expectedArgument = JSON.stringify(data);
            // act
            ls.setItem(data);
            // assert
            expect(localStorage.setItem).toHaveBeenCalledWith(
                storeName,
                expectedArgument
            );
        });
    });

    describe('When the method setItems is used', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.setItem = jest.fn();
            let expectedArgument = JSON.stringify([data]);
            // act
            ls.setItems([data]);
            // assert
            expect(localStorage.setItem).toHaveBeenCalledWith(
                storeName,
                expectedArgument
            );
        });
    });

    describe('When the method removeItems is used', () => {
        test('Then corresponding method in localStorage should be call', () => {
            // arrange
            global.Storage.prototype.removeItem = jest.fn();
            // act
            ls.removeItems();
            // assert
            expect(localStorage.removeItem).toHaveBeenCalledWith(storeName);
        });
    });
});
