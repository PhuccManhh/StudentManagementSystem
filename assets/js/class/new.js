import { SERVER_HOST } from "../constant.js";


export function newClass(className) {
    // Kiểm tra lại SERVER_HOST và payload
    const payload = { name: className }; // Sử dụng trường name nếu API yêu cầu
  
    fetch(`${SERVER_HOST}/class/newClass`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // Gửi payload
    })
    .then(response => {
        if (response.ok) {
            console.log('Thêm lớp học thành công vào hệ thống');
            window.location.href = 'http://127.0.0.1:5500/pages/class/index.html';
        } else {
            console.error('Thêm lớp học không thành công vào hệ thống');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('AddClass').addEventListener('click', function () {
    const className = document.getElementById('classInput').value.trim();
    if (className) {
        newClass(className);
    } else {
        alert('Vui lòng nhập tên lớp học!');
    }

});


