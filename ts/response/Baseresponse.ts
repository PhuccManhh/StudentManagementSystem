export class BaseResponse<T> {
    private code: number;
    private message: string;
    private data: T;

    // Constructor không tham số
    constructor();
    
    constructor(code?: number, message?: string, data?: T) {
        this.code = code ?? 500; // Sử dụng giá trị mặc định nếu không có tham số
        this.message = message ?? '';
        this.data = data ?? ({} as T); // Sử dụng kiểu khởi tạo mặc định
    }

    // Getter và Setter cho `code`
    public getCode(): number {
        return this.code;
    }

    public setCode(code: number): void {
        this.code = code;
    }

    // Getter và Setter cho `message`
    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    // Getter và Setter cho `data`
    public getData(): T {
        return this.data;
    }

    public setData(data: T): void {
        this.data = data;
    }
}
