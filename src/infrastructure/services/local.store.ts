export class LocalStore<T> {
    constructor(private storeName: string) {}

    getItems(): T {
        return localStorage.getItem(this.storeName)
            ? JSON.parse(localStorage.getItem(this.storeName) as string)
            : [];
    }

    setItems(data: T) {
        localStorage.setItem(this.storeName, JSON.stringify(data));
    }

    removeItems() {
        localStorage.removeItem(this.storeName);
    }
}
