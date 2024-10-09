
import { post, getParam } from "../method.js"
import { SERVER_HOST } from "../constant.js";
import { deleteStudent } from "../student/delete.js"

function renderStudent() {
    const body = {};
    body.class_id = getParam('class');
    body.code = null;
    fetchStudent(body);
}

document.getElementById('search-student').onkeyup = function () {
    const body = {};
    body.class_id = getParam('class');
    body.code = this.value;
    fetchStudent(body);
}

function fetchStudent(body) {
    post(SERVER_HOST + '/student', body).
        then(data => {
            console.log(data);
            
            const tableData = document.getElementById('student-list');
            const studentData = data.data;
            tableData.innerHTML = '';
            studentData.forEach((student, index) => {
                let birthDay = new Date(student.birthday).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, ' - ');
                let row =
                    `<tr>
            <td>${index + 1}</td>
            <td>${student.code}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${birthDay}</td>
            <td>${student.address}</td>
            <td>${student.phoneNumber}</td>
            <td>
                    <button dataIp = "${student.id}" type="button" class="btn btn-danger delete-student">Xóa</button>
                </td>
            </tr>`
            tableData.insertAdjacentHTML('beforeend', row);
        });

        document.querySelectorAll('.delete-student').forEach(btn => {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                const classId = this.getAttribute('dataIp');
                deleteStudent(classId);
            });
        });
    });

}

window.onload = renderStudent;