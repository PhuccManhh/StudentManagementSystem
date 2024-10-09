export class AttendanceSessionDto {
    private id: number;
    private class_id: number;
    private shift_id: number;
    private create_at: string;
    private class_name: string;
    private shift_name: string;
    private deleted: number;
    private class_code: string;
    private cart_report: object;

    // Constructor overloading for different initialization cases
    constructor(id?: number, class_id?: number, class_code?: string, cart_report?: object, shift_id?: number, create_at?: string, deleted?: number) {
        this.id = id ?? null;
        this.class_id = class_id ?? null;
        this.class_code = class_code ?? null;
        this.cart_report = cart_report ?? null;
        this.shift_id = shift_id ?? null;
        this.create_at = create_at ?? null;
        this.deleted = deleted ?? 0;
    }

    // Getter and Setter for id
    public getId(): number | null {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    // Getter and Setter for class_id
    public getClassId(): number | null {
        return this.class_id;
    }

    public setClassId(class_id: number): void {
        this.class_id = class_id;
    }

    // Getter and Setter for shift_id
    public getShiftId(): number | null {
        return this.shift_id;
    }

    public setShiftId(shift_id: number): void {
        this.shift_id = shift_id;
    }

    // Getter and Setter for create_at
    public getCreateAt(): string | null {
        return this.create_at;
    }

    public setCreateAt(create_at: string): void {
        this.create_at = create_at;
    }

    // Getter and Setter for create_at
    public getClassName(): string | null {
        return this.class_name;
    }

    public setClassName(class_name: string): void {
        this.class_name = class_name;
    }

    // Getter and Setter for create_at
    public getClassCode(): string | null {
        return this.class_code;
    }

    public setClassCode(class_code: string): void {
        this.class_code = class_code;
    }

    // Getter and Setter for create_at
    public getShiftName(): string | null {
        return this.shift_name;
    }

    public setShiftName(shift_name: string): void {
        this.shift_name = shift_name;
    }

    // Getter and Setter for deleted
    public getDeleted(): number {
        return this.deleted;
    }

    public setDeleted(deleted: number): void {
        this.deleted = deleted;
    }

    public getCartReport(): object {
        return this.cart_report;
    }

    // Setter for cart_report
    public setCartReport(newReport: object): void {
        this.cart_report = newReport;
    }
}
