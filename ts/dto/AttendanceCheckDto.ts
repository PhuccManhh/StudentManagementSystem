export class AttendanceCheckDto {
    private id: number;
    private attendance_session_id: number;
    private student_id: number;
    private status: string;
    private status_code:string;
    private note: string;
    private deleted: number;

    // Constructor
    constructor(id?: number, attendance_session_id?: number, student_id?: number, status?: string,status_code?: string, note?: string, deleted?: number) {
        this.id = id ?? null;
        this.attendance_session_id = attendance_session_id ?? null;
        this.student_id = student_id ?? null;
        this.status = status ?? "";
        this.status_code = status_code ?? "";
        this.note = note ?? "";
        this.deleted = deleted ?? 0;
    }

    // Getter and Setter for id
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    // Getter and Setter for attendance_session_id
    public getAttendanceSessionId(): number {
        return this.attendance_session_id;
    }

    public setAttendanceSessionId(attendance_session_id: number): void {
        this.attendance_session_id = attendance_session_id;
    }

    // Getter and Setter for student_id
    public getStudentId(): number {
        return this.student_id;
    }

    public setStudentId(student_id: number): void {
        this.student_id = student_id;
    }

    // Getter and Setter for status
    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

     // Getter and Setter for status
     public getStatusCode(): string {
        return this.status_code;
    }

    public setStatusCode(status_code: string): void {
        this.status_code = status_code;
    }

    // Getter and Setter for note
    public getNote(): string {
        return this.note;
    }

    public setNote(note: string): void {
        this.note = note;
    }

    // Getter and Setter for deleted
    public getDeleted(): number {
        return this.deleted;
    }

    public setDeleted(deleted: number): void {
        this.deleted = deleted;
    }
}
