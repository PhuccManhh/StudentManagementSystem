import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import classRoutes from './class';
import studentRoutes from './student';
import shiftRoutes from './shift';
const app = express();
const port = 3000;

// Sử dụng middleware cors
app.use(cors());

// Cài đặt middleware để parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.json({ message: "test abc" });
    } catch (error) {
        console.error('Error fetching grade data:', error);
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});

// Định nghĩa các route cho /class
app.use('/class', classRoutes);

// Định nghĩa các route cho /class
app.use('/student', studentRoutes);

// Định nghĩa các route cho /class
app.use('/shift', shiftRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});