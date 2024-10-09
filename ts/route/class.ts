import express from 'express';
import { ClassServicelmpl } from '../service/impl/ClassServicelmpl';
import { AttendanceSessionDto } from '../dto/AttendanceSessionDto';
import { AttendanceSessionServiceImpl } from '../service/impl/AttendanceSessionServiceImpl';
import { AttendanceCheckDto } from '../dto/AttendanceCheckDto';
import { AttendanceCheckService } from '../service/impl/AttendanceCheckService';
import { AttendanceCheckRequestFilter } from '../request/AttendanceCheckFilterRequest';
const router = express.Router();

const classService = new ClassServicelmpl();
const attendanceSessionService = new AttendanceSessionServiceImpl();
const attendanceCheckService = new AttendanceCheckService();

// Chuyển hàm route handler thành async
router.get('/', async (req, res) => {
    try {

        const classStudent = await classService.showAll();

        res.json(classStudent);
    } catch (error) {
        // Xử lý lỗi và gửi phản hồi lỗi
        console.error('Error fetching student data:', error);
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleteClassResponse = await classService.deleteById(id);
        res.json(deleteClassResponse);
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).send('Có lỗi xảy ra khi xóa lớp học.');
    }
});

router.post('/newClass', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                code: '400',
                message: 'Tên lớp học không được để trống'
            });
        }
        const newAdd = await classService.addClass(name);
        res.json(newAdd);
    } catch (e) {
        console.error('Error adding class', e);
        res.status(500).json({
            code: '500',
            message: 'lỗi khi thêm lớp học'
        });
    }
});




export default router;
