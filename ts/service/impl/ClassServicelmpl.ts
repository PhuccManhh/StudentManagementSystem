import { ClassDto } from "../../dto/ClassDto";
import { BaseResponse } from "../../response/Baseresponse";
import { IClassService } from "../IClassService";
import fs from 'fs/promises';
import path from 'path';


const pathJson = path.join(__dirname, "../../../data/class.json");


export class ClassServicelmpl implements IClassService {

    async showAll(): Promise<BaseResponse<ClassDto[]>> {
        const response = new BaseResponse<ClassDto[]>();

        try {
            const data = await fs.readFile(pathJson, 'utf8');
            const classData = JSON.parse(data);
            response.setCode(200);
            response.setMessage('Lấy danh sách lớp thành công');
            response.setData(classData);
        } catch (error) {
            response.setCode(500);
            response.setMessage('Lấy danh sách lớp học không thành công');
            response.setData([]);
        }

        return response;
    }


    async deleteById(id: number): Promise<BaseResponse<ClassDto | null>> {
        const response = new BaseResponse<ClassDto | null>();
        try {
            // Đọc file JSON
            const data = await fs.readFile(pathJson, 'utf-8');
            const classDataRaw: any[] = JSON.parse(data);
    
            // Chuyển đổi đối tượng JSON thành instance của ClassDto
            const classData: ClassDto[] = classDataRaw.map(
                cls => new ClassDto(cls.id, cls.code, cls.name, cls.deleted)
            );
    
            console.log(classData);
    
            // Tìm index của lớp học theo ID
            const classIndex = classData.findIndex(cls => cls.getId() === id);
    
            if (classIndex !== -1) {
                // Xóa lớp học và trả lại lớp đã xóa
                const [deletedClass] = classData.splice(classIndex, 1);
                await fs.writeFile(pathJson, JSON.stringify(classData, null, 2), 'utf8');
    
                // Thiết lập phản hồi thành công
                response.setCode(200);
                response.setMessage('Xóa lớp học thành công');
                response.setData(deletedClass);
            } else {
                // Không tìm thấy lớp học, thiết lập phản hồi 404
                response.setCode(404);
                response.setMessage('Không tìm thấy lớp học với ID này');
            }
        } catch (e) {
            // Xử lý lỗi trong quá trình đọc hoặc ghi file
            console.error('Lỗi khi xóa lớp học:', e);
            response.setCode(500);
            response.setMessage('Xóa lớp học không thành công');
        }
        return response;
    }

    async addClass(name: string): Promise<BaseResponse<ClassDto>> {
        const response = new BaseResponse<ClassDto>();
    
        try {
            // Đọc dữ liệu từ file JSON
            const data = await fs.readFile(pathJson, 'utf8');
            let dataClass: ClassDto[] = [];
    
            // Kiểm tra nếu file không trống
            if (data) {
                // Phân tích dữ liệu JSON
                const jsonData = JSON.parse(data);
    
                // Chuyển đổi dữ liệu JSON thành các đối tượng ClassDto
                dataClass = jsonData.map((item: any) => new ClassDto(item.id, item.code, item.name, item.deleted));
            }
    
            // Tìm ID lớn nhất hiện có và tăng lên 1
            const classId = dataClass.length > 0 ? Math.max(...dataClass.map(c => c.getId())) : 0;
            const newId = classId + 1;
    
            // Tạo mã code cho lớp học mới
            const newCode = `C${newId.toString().padStart(3, '0')}`; // Ví dụ: CLS001
    
            // Tạo đối tượng lớp học mới
            const newClass = new ClassDto(newId, newCode, name, 0); // 0: Chưa bị xóa
    
            // Thêm lớp học mới vào danh sách
            dataClass.push(newClass);
    
            // Ghi dữ liệu đã cập nhật vào file JSON
            await fs.writeFile(pathJson, JSON.stringify(dataClass, null, 2));
    
            // Thiết lập phản hồi thành công
            response.setCode(200);
            response.setMessage('Thêm lớp học vào hệ thành công');
            response.setData(newClass);
    
        } catch (error) {
            // Xử lý lỗi và phản hồi nếu xảy ra lỗi
            response.setCode(500);
            response.setMessage('Thêm lớp học vào hệ thống không thành công');
            console.error('Error adding class:', error);
        }
    
        return response;
    }

}



