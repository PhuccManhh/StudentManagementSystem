import { SERVER_HOST } from "../constant.js";
import { get } from "../method.js";
import { deleteClass } from './delete.js'; 

function creatClass() {
    get(SERVER_HOST + '/class').then(data => {
        const tableClass = document.getElementById('class-table');
        const classData = data.data;
        classData.forEach((classStudent, index) => {
            let row =
                `<tr>
            <td>${index + 1}</td>
            <td>${classStudent.code}</td>
            <td>${classStudent.name}</td>
            <td>
                <a href="../student/index.html?class=${classStudent.id}" type="button" class="btn btn-primary">Chi tiết</a>
               <button data-id ="${classStudent.id}"  type="button" class="btn btn-danger delete-btn">Xóa</button>

            </td>
        </tr>`
            tableClass.insertAdjacentHTML('beforeend', row);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                const classId = this.getAttribute('data-id');
                deleteClass(classId);
            });
        });
    });
    
}

window.onload = creatClass;