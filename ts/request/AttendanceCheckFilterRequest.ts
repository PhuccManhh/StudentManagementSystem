export class AttendanceCheckRequestFilter {
    private attendance_session_id: number;

    // Constructor
    constructor(attendance_session_id?: number, class_id?: number) {
        this.attendance_session_id = attendance_session_id || null;
    }

    // Getter for attendance_session_id
    public getAttendanceSessionId(): number {
        return this.attendance_session_id;
    }

    // Setter for attendance_session_id
    public setAttendanceSessionId(attendance_session_id: number): void {
        this.attendance_session_id = attendance_session_id;
    }
}
