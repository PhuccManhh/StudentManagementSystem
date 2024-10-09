import { StudentDto } from "../dto/StudentDto";
import { BaseResponse } from "../response/Baseresponse";
import { StudentFilterRequest } from "../request/StudentFilterRequest";

export interface IStudentService {
    getAll(filterRequest: StudentFilterRequest): Promise< BaseResponse<StudentDto[]>>;
    deleteId(id: number): Promise< BaseResponse<StudentDto | null>>;
    newStudent(student: StudentDto ): Promise< BaseResponse<any>>;
}
