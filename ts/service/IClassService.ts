import { ClassDto } from "../dto/ClassDto";
import { BaseResponse } from "../response/Baseresponse";


export interface IClassService {
    showAll(): Promise< BaseResponse<ClassDto[]>>;
    deleteById(id: number): Promise< BaseResponse<ClassDto | null>>;
    addClass(name: string): Promise< BaseResponse<ClassDto>>
}

