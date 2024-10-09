export class ShiftDto {
    private id: number;
    private name: string;
    private checkIn: string;
    private checkOut: string;
    private deleted: number;

    constructor(id: number, name: string, checkIn: string, checkOut: string, deleted: number) {
        this.id = id;
        this.name = name;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.deleted = deleted;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getCheckIn(): string {
        return this.checkIn;
    }

    public setCheckIn(time: string): void {
        this.checkIn = time;
    }

    public getCheckOut(): string {
        return this.checkOut;
    }

    public setCheckOut(time: string): void {
        this.checkOut = time;
    }

    public getDelete(): number {
        return this.deleted;
    }

    public setDelete(deleted: number): void {
        this.deleted = deleted;
    }
}