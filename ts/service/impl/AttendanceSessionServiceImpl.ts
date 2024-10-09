import { AttendanceSessionDto } from "../../dto/AttendanceSessionDto";
import { ClassDto } from "../../dto/ClassDto";
import { ShiftDto } from "../../dto/ShiftDto";
import { BaseResponse } from "../../response/Baseresponse";
import { IAttendanceSessionService } from "../IAttendanceSessionService";
import fs from 'fs/promises';
import path from 'path';

const pathAttendanceSession = path.join(__dirname, "../../../data/attendanceSession.json");
const pathClass = path.join(__dirname, "../../../data/class.json");
const pathShift = path.join(__dirname, "../../../data/shift.json");
const pathAttendanceCheck = path.join(__dirname, "../../../data/attendanceCheck.json");

export class AttendanceSessionServiceImpl implements IAttendanceSessionService {
    async getAll(): Promise<BaseResponse<AttendanceSessionDto[]>> {
        const response = new BaseResponse<AttendanceSessionDto[]>();

        try {
            const attendanceSessionRead = await fs.readFile(pathAttendanceSession, 'utf8');
            const attendanceSessionData: any[] = JSON.parse(attendanceSessionRead);
            const classRead = await fs.readFile(pathClass, 'utf8');
            const classData: any[] = JSON.parse(classRead);
            const shiftRead = await fs.readFile(pathShift, 'utf8');
            const shiftData: any[] = JSON.parse(shiftRead);

            // Tạo đối tượng ClassDto từ dữ liệu classData
            const classDtos = classData.map(c => new ClassDto(c.id, c.code, c.name, c.deleted));

            // Tạo ánh xạ (map) cho các lớp học
            const classMapName = new Map<number, string>(classDtos.map(c => [c.getId(), c.getName()]));

            // Tạo ánh xạ (map) cho các lớp học
            const classMapCode = new Map<number, string>(classDtos.map(c => [c.getId(), c.getCode()]));

            // Tạo đối tượng ClassDto từ dữ liệu classData
            const shiftDtos = shiftData.map(s => new ShiftDto(s.id, s.name, s.check_in, s.check_out, s.deleted));
            console.log(shiftDtos);


            // Tạo ánh xạ (map) cho các lớp học
            const shiftMap = new Map<number, string>(shiftDtos.map(s => [s.getId(), s.getName() + "( " + s.getCheckIn() + "-" + s.getCheckOut() + " )"]));

            const attendanceSessionDtos = attendanceSessionData.map(a => new AttendanceSessionDto(a.id, a.class_id, a.shift_id, a.create_at, a.deleted));


            attendanceSessionDtos.forEach(attendance => {
                const className = classMapName.get(attendance.getClassId()) || 'Unknown Class';
                const classCode = classMapCode.get(attendance.getClassId()) || 'Unknown Class';
                const shiftName = shiftMap.get(attendance.getShiftId()) || 'Unknown Shift';

                attendance.setClassName(className); // Sử dụng phương thức setter
                attendance.setClassCode(classCode);
                attendance.setShiftName(shiftName); // Sử dụng phương thức setter
            });

            response.setCode(200);
            response.setMessage('Lấy danh sách phiên điểm danh thành công');
            response.setData(attendanceSessionDtos);
        } catch (error) {
            response.setCode(500);
            response.setMessage('Lấy danh sách phiên điểm danh không thành công');
            response.setData([]);
        }

        return response;
    }
    async insertRecord(record: AttendanceSessionDto): Promise<BaseResponse<AttendanceSessionDto>> {
        const response = new BaseResponse<AttendanceSessionDto>();

        try {
            const data = await fs.readFile(pathAttendanceSession, 'utf8');
            const dataJson = JSON.parse(data);
            const newId = dataJson.length > 0 ? dataJson[dataJson.length - 1].id + 1 : 1;
            record.setId(newId);
            const today = new Date();
            const currentTime = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
            record.setCreateAt(currentTime);
            dataJson.push(record);
            await fs.writeFile(pathAttendanceSession, JSON.stringify(dataJson, null, 2), 'utf8');
            response.setCode(200);
            response.setMessage('Thêm phiên điểm danh thành công');
            response.setData(record)
        } catch (error) {
            response.setCode(500);
            response.setMessage('Thêm phiên điểm danh không thành công');
        }

        return response;
    }

    async getRecord(recordId: number): Promise<BaseResponse<AttendanceSessionDto>> {
        const response = new BaseResponse<AttendanceSessionDto>();
        try {
            const attendanceSessionRead = await fs.readFile(pathAttendanceSession, 'utf8');
            const attendanceSessionData: any[] = JSON.parse(attendanceSessionRead);
            const attendanceCheckRead = await fs.readFile(pathAttendanceCheck, 'utf8');
            const attendanceCheckData: any[] = JSON.parse(attendanceCheckRead);
            

            const countPresent = attendanceCheckData.filter(item => item.status == "PRESENT"&& item.attendance_session_id === recordId).length;
            const countTardy = attendanceCheckData.filter(item => item.status == "TARDY" && item.attendance_session_id === recordId).length;
            const countExcusedAbsence = attendanceCheckData.filter(item => item.status == "EXCUSED_ABSENCE" && item.attendance_session_id === recordId).length;
            const countUnexcusedAbsence = attendanceCheckData.filter(item => item.status == "UNEXCUSED_ABSENCE" && item.attendance_session_id === recordId).length;
            const cartReport = {
                present: countPresent,
                tardy: countTardy,
                excused_absence: countExcusedAbsence,
                unexcused_absence: countUnexcusedAbsence
            };
            

            const filteredAttendance = attendanceSessionData.find(item => item.id === recordId);
            const outPut = new AttendanceSessionDto(
                filteredAttendance.id,
                filteredAttendance.class_id,
                null,
                cartReport,
                filteredAttendance.shift_id,
                filteredAttendance.created_at,
                filteredAttendance.deleted
            )
            response.setCode(200);
            response.setMessage('Lấy danh sách phiên điểm danh thành công');
            response.setData(outPut);
        } catch (error) {
            response.setCode(500);
            response.setMessage('Lấy danh sách phiên điểm danh không thành công');
            response.setData(null);
        }

        return response;
    }
}