export class Pagination<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;

    constructor(items: T[], page?: number, limit?: number, total?: number) {
        this.items = items;
        this.page = page || 1;
        this.limit = limit || 10;
        this.total = total || items.length;
    }
}
