import { ShiftDto } from "../../dto/ShiftDto";
import { BaseResponse } from "../../response/Baseresponse";
import { IShiftService } from "../IShiftService";
import fs from 'fs/promises';
import path from 'path';

const pathJson = path.join(__dirname, "../../../data/shift.json");

export class ShiftServiceImpl implements IShiftService {
    async getAll(): Promise<BaseResponse<ShiftDto[]>> {
        const response = new BaseResponse<ShiftDto[]>();
        try {
            const data = await fs.readFile(pathJson, 'utf8');
            const shiftData = JSON.parse(data);
            response.setCode(200);
            response.setMessage('Lấy danh sách ca học thành công');
            response.setData(shiftData);
        } catch (error) {
            response.setCode(500);
            response.setMessage('Lấy danh sách ca học không thành công');
            response.setData([]);
        }
        return response;
    }
}