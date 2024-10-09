import { SERVER_HOST } from "../constant.js";


export function newStudent() {
    console.log(3);
    // Lấy các giá trị từ form
    const name = document.getElementById('name').value.trim();
    const birthday = document.getElementById('year').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const address = document.getElementById('address').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
    
    // Kiểm tra nếu thiếu thông tin
    if (!name || !birthday || !gender || !address || !phoneNumber) {
        alert('Vui lòng nhập đầy đủ thông tin sinh viên!');
        return;
    }

    // Tạo đối tượng data chứa thông tin sinh viên
    const data = { name, birthday, gender, address, phoneNumber };

    // Gửi yêu cầu POST đến server
    fetch(`${SERVER_HOST}/student/newStudent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // Gửi dữ liệu dưới dạng JSON
    })
    .then(response => {
        if (response.ok) {
            console.log('Thêm sinh viên thành công vào hệ thống', data);
            window.location.href = 'http://127.0.0.1:5500/pages/class/index.html';
        } else {
            console.error('Thêm sinh viên không thành công vào hệ thống');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
    })
    .catch(error => console.error('Error:', error));
}


const buttonStudent = document.getElementById('createStudent');
buttonStudent .addEventListener('click', function () {
    if(buttonStudent ){
        newStudent(); 
    }else{
        alert('Vui lòng nhập tên lớp học!');
    }
});
