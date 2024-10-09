import { SERVER_HOST } from "../constant.js";
import { get } from "../method.js";

function renderAttendanceSession() {
    get(SERVER_HOST + '/class/attendance-session').then(data => {
        const tableClass = document.getElementById('attendance-session-list');
        const attendanceSessionData = data.data;
        attendanceSessionData.forEach((attendanceSession, index) => {
            let row =
                `<tr>
            <td>${index + 1}</td>
             <td>${attendanceSession.class_code}</td>
            <td>${attendanceSession.class_name}</td>
            <td>${attendanceSession.shift_name}</td>
            <td>
                <a href="../attendanceCheck/index.html?id=${attendanceSession.id}&class=${attendanceSession.class_id}" type="button" class="btn btn-primary">Xem điểm danh</a>
                <a href="./index.html" type="button" class="btn btn-danger">Xóa</a>
            </td>
        </tr>`
            tableClass.innerHTML += row;
        });
    })
}

window.onload = renderAttendanceSession;