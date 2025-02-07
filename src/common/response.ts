export class Response<T> {
    public message: string;
    public code: number;
    public data?: T;
}
