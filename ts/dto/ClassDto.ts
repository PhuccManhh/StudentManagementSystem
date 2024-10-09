import { StudentDto } from "./StudentDto";
export class ClassDto {
    private id: number;
    private code: string;
    private name: string;
    private deleted: number;

    constructor(id: number, code: string, name: string, deleted: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.deleted = deleted;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDelete(): number {
        return this.deleted;
    }

    public setDelete(deleted: number): void {
        this.deleted = deleted;
    }
}