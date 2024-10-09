import express from 'express';
import StudentServiceImpl from '../service/impl/StudentServiceImpl';
import { StudentFilterRequest } from '../request/StudentFilterRequest';
import { StudentDto } from '../dto/StudentDto';

const router = express.Router();
const studentService = new StudentServiceImpl();

router.post('/', async (req, res) => {
    try {
        const body = req.body;

        const filterRequest = new StudentFilterRequest(
            body.class_id,
            body.code
        );
        const response = await studentService.getAll(filterRequest);

        res.json(response);
    } catch (error) {
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleteStudentResponse = await studentService.deleteId(id); 
        res.json(deleteStudentResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi khi xóa sinh viên.');
    }
});


router.post('/newStudent', async (req, res) => {
    try {
        const studentp = req.body; // Lấy dữ liệu sinh viên từ request body

        // Kiểm tra nếu không có dữ liệu sinh viên
        if (!studentp) {
            return res.status(400).json({
                code: '400',
                message: 'Thông tin sinh viên không được bỏ trống'
            });
        }

        // Tạo một instance của StudentDto từ dữ liệu request body
        const student = new StudentDto(studentp.id, studentp.code, studentp.name, new Date(studentp.birthday), studentp.gender, studentp.address, studentp.phoneNumber, studentp.class_id, studentp.deleted
        );

        // Truyền đối tượng sinh viên cho hàm newStudent
        const moreStudent = await studentService.newStudent(student);
        res.json(moreStudent);

    } catch (e) {
        console.error('Error adding student', e);
        res.status(500).json({
            code: '500',
            message: 'Lỗi khi thêm sinh viên'
        });
    }
});


export default router;
