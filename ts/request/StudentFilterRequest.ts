export class StudentFilterRequest {
    private classId: number;
    private code: string;

    // Constructor
    constructor(classId: number, code: string) {
        this.classId = classId;
        this.code = code;
    }

    // Getter và Setter cho `classId`
    public getClassId(): number {
        return this.classId;
    }

    public setClassId(classId: number): void {
        this.classId = classId;
    }

    // Getter và Setter cho `name`
    public getCode(): string {
        return this.code;
    }

    public SetCode(code: string): void {
        this.code = code;
    }
}
