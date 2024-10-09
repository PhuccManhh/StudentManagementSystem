import express from 'express';
import { ShiftServiceImpl } from '../service/impl/ShiftServiceImpl';
const router = express.Router();


const shiftService = new ShiftServiceImpl();
router.get('/', async (req, res) => {
    try {
        const shifts = await shiftService.getAll();
        res.json(shifts);
    } catch (error) {
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});


export default router;
