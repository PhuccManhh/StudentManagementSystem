import { BaseResponse } from "../response/Baseresponse";
import { AttendanceSessionDto } from "../dto/AttendanceSessionDto";

export interface IAttendanceSessionService {
    getAll(): Promise<BaseResponse<AttendanceSessionDto[]>>;
    insertRecord(record: AttendanceSessionDto): Promise<BaseResponse<AttendanceSessionDto>>;
    getRecord(recordId : number): Promise<BaseResponse<AttendanceSessionDto>>;
}
