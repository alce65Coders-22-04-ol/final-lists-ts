export class LocalStore<T> {
    constructor(private storeName: string) {}

    getItem(): T {
        return localStorage.getItem(this.storeName)
            ? JSON.parse(localStorage.getItem(this.storeName) as string)
            : null;
    }

    getItems(): Array<T> {
        return localStorage.getItem(this.storeName)
            ? JSON.parse(localStorage.getItem(this.storeName) as string)
            : [];
    }

    setItem(data: T) {
        localStorage.setItem(this.storeName, JSON.stringify(data));
    }

    setItems(data: Array<T>) {
        localStorage.setItem(this.storeName, JSON.stringify(data));
    }

    removeItems() {
        localStorage.removeItem(this.storeName);
    }
}
