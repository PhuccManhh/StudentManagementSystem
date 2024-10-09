import { BaseResponse } from "../response/Baseresponse";
import { ShiftDto } from "../dto/ShiftDto";

export interface IShiftService {
    getAll(): Promise<BaseResponse<ShiftDto[]>>;
}
