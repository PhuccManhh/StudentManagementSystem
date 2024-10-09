import { AttendanceCheckDto } from "../../dto/AttendanceCheckDto";
import { AttendanceCheckRequestFilter } from "../../request/AttendanceCheckFilterRequest";
import { BaseResponse } from "../../response/Baseresponse";
import { IAttendanceCheckService } from "../IAttendanceCheckService";
import { AttendanceStatus } from "../../enum/AttendanceStatus";
import fs from 'fs/promises';
import path from 'path';
const pathAttendanceCheck = path.join(__dirname, "../../../data/attendanceCheck.json");

export class AttendanceCheckService implements IAttendanceCheckService {
    async getAll(filterRequest: AttendanceCheckRequestFilter): Promise<BaseResponse<AttendanceCheckDto[]>> {
        const response = new BaseResponse<AttendanceCheckDto[]>();
        try {
            const data = await fs.readFile(pathAttendanceCheck, 'utf8');
            const attendanceCheckData = JSON.parse(data);
            const attendanceChecks: AttendanceCheckDto[] = attendanceCheckData.map((item: any) => {
                const attendanceStatus = item.status as keyof typeof AttendanceStatus;
                const status = AttendanceStatus[attendanceStatus];
                return new AttendanceCheckDto(
                    item.id,
                    item.attendance_session_id,
                    item.student_id,
                    status,
                    item.status,
                    item.note,
                    item.deleted
                )
            });

            const filteredAttendanceCheck = attendanceChecks.filter(attendance => {
                const attendanceSessionMatches = attendance.getAttendanceSessionId() === filterRequest.getAttendanceSessionId();
                return attendanceSessionMatches;
            });

            response.setCode(200);
            response.setMessage('Lấy lịch sử điểm danh thành công');
            response.setData(filteredAttendanceCheck);
        } catch (err) {
            response.setCode(500);
            response.setMessage('Lấy lịch sử điểm danh không thành công');
            response.setData([]);
        }

        return response;
    }
    async insertRecord(records: AttendanceCheckDto[]): Promise<BaseResponse<any>> {
        const response = new BaseResponse<any>();
        try {
            const attendanceCheckRead = await fs.readFile(pathAttendanceCheck, 'utf8');
            const attendanceCheckData: any[] = JSON.parse(attendanceCheckRead);

            let endId = attendanceCheckData.length > 0
                ? Math.max(...attendanceCheckData.map(record => record.id))
                : 0;

            records.forEach((item, index) => {
                // Kiểm tra xem có bản ghi nào trùng với attendance_session_id và student_id không
                const existingIndex = attendanceCheckData.findIndex(record =>
                    record.attendance_session_id === item.getAttendanceSessionId() &&
                    record.student_id === item.getStudentId()
                );

                if (existingIndex !== -1) {
                    item.setId(attendanceCheckData[existingIndex].id);
                    attendanceCheckData[existingIndex] = item;
                } else {
                    item.setId(endId + 1);
                    console.log((index + 1), attendanceCheckData[attendanceCheckData.length - 1].id);
                    endId++;
                    attendanceCheckData.push(item);
                }
            })

            await fs.writeFile(pathAttendanceCheck, JSON.stringify(attendanceCheckData, null, 2), 'utf8');
            response.setCode(200);
            response.setMessage("Điểm danh đã được lưu");
        } catch (error) {
            response.setCode(500);
            response.setMessage('Thất bại. Điểm danh không được được lưu');
        }
        return response;
    }

}