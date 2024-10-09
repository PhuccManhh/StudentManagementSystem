import { SERVER_HOST } from "../constant.js";
import { get, post, getParam } from "../method.js";
const classId = getParam("class");
const attendanceSessionId = getParam("id");

function renderAttentionHistory() {
    const body = {};
    body.attendance_session_id = attendanceSessionId;
    post(SERVER_HOST + '/class/attendance-check', body).then(data => {
        const attendanceCheck = data.data;
        attendanceCheck.forEach(item => {
            const status = item.status_code;
            const studentId = item.student_id;
            const radioRecords = document.querySelectorAll(`input[name="status_attendance_${studentId}"]`);
            radioRecords.forEach(radio => {
                if (radio.value === status) {
                    radio.checked = true;
                } else {
                    radio.checked = false;
                }
            });
            document.getElementById("note_" + studentId).value = item.note;
        });
        cardReport();
        const attendanceData = attendance(attendanceCheck);
        document.getElementById('submit-attendance').onclick = function () {
            submitAttendance(attendanceData);
        }
    });
}

function cardReport() {
    get(SERVER_HOST + '/class/attendance-session/' + attendanceSessionId).then(data => {
        const cardReport = data.data.cart_report;
        if (cardReport.present > 0) {
            renderCardReport(cardReport.present, cardReport.tardy, cardReport.excused_absence, cardReport.unexcused_absence);
        } else countCheckedRadioButtons();
    });
}

function renderStudent() {
    const body = {};
    body.class_id = classId;
    post(SERVER_HOST + '/student', body).then(data => {
        const studentData = data.data;
        const tableClass = document.getElementById('attendance-student');
        if (studentData.length > 0) {
            studentData.forEach((student, index) => {
                let row =
                    `<tr>
                        <td>${index + 1}</td>
                        <td>${student.code}</td>
                        <td>${student.name}</td>
                        <td><input class="form-check-input" type="radio" data-student =${student.id} name="status_attendance_${student.id}" value="PRESENT" checked></td>
                        <td><input class="form-check-input" type="radio" data-student =${student.id} name="status_attendance_${student.id}" value="TARDY"></td>
                        <td><input class="form-check-input" type="radio" data-student =${student.id} name="status_attendance_${student.id}" value="EXCUSED_ABSENCE"></td>
                        <td><input class="form-check-input" type="radio" data-student =${student.id} name="status_attendance_${student.id}" value="UNEXCUSED_ABSENCE"></td>
                        <td><textarea class="form-control" data-student =${student.id} id="note_${student.id}" ></textarea></td>
                        </tr>`;
                tableClass.innerHTML += row;
            });
            renderAttentionHistory();
        }
    });
}


function attendance(attendanceData) {
    attendanceData = assignRadioButtonChangeEvent(attendanceData);
    attendanceData = assignTextareaChangeEvent(attendanceData);
    console.log(attendanceData);

    return attendanceData;
}

function assignRadioButtonChangeEvent(attendanceData) {
    const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    allRadioButtons.forEach((radio) => {
        if (radio.checked) {
            const studentId = parseInt(radio.dataset.student);  // Lấy giá trị data-student
            const note = document.getElementById("note_" + studentId)?.value || null;
            const attendanceItem = {
                "id": null,
                "attendance_session_id": attendanceSessionId,
                "student_id": studentId,
                "status": radio.value,
                "note": note,
                "deleted": 0
            };
            checkExist(attendanceData, attendanceItem, studentId)
        }
        radio.addEventListener('change', (event) => {
            const studentId = event.target.dataset.student;
            const note = document.getElementById("note_" + studentId)?.value || null;
            const attendanceItem = {
                "id": null,
                "attendance_session_id": attendanceSessionId,
                "student_id": studentId,
                "status": event.target.value,
                "note": note,
                "deleted": 0
            };
            checkExist(attendanceData, attendanceItem, studentId);
            countCheckedRadioButtons()
        });
    });

    return attendanceData;
}

function assignTextareaChangeEvent(attendanceData) {
    const allTextareas = document.querySelectorAll('textarea');
    allTextareas.forEach((textarea) => {
        textarea.addEventListener('change', (event) => {
            const studentId = parseInt(event.target.dataset.student);
            const attendanceStatus = getCheckedRadioValue("status_attendance_" + studentId);
            const attendanceItem = {
                "id": textarea.id,
                "attendance_session_id": attendanceSessionId,
                "student_id": studentId,
                "status": attendanceStatus,
                "note": event.target.value,
                "deleted": 0
            };
            checkExist(attendanceData, attendanceItem, studentId)
        });
    });

    return attendanceData;
}

function submitAttendance(data) {
    post(SERVER_HOST + '/class/new-attendance-check', data).
        then(data => {
            console.log(data);
            alert("Đã lưu điểm danh");
        });
}

function getCheckedRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

function checkExist(attendanceData, attendanceItem, studentId) {
    const existingIndex = attendanceData.findIndex(item => item.student_id === studentId);
    if (existingIndex === -1) {
        attendanceData.push(attendanceItem);
    } else {
        attendanceData[existingIndex].status = attendanceItem.status;
        attendanceData[existingIndex].note = attendanceItem.note;
    }
}

function countCheckedRadioButtons() {
    const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    let countPresent = 0, countTady = 0, countExcusedAbsence = 0, countUnxcusedAbsence = 0;
    allRadioButtons.forEach(radio => {
        if (radio.checked && radio.value === "PRESENT") {
            countPresent++;
        }
        if (radio.checked && radio.value === "TARDY") {
            countTady++;
        }
        if (radio.checked && radio.value === "EXCUSED_ABSENCE") {
            countExcusedAbsence++;
        }
        if (radio.checked && radio.value === "UNEXCUSED_ABSENCE") {
            countUnxcusedAbsence++;
        }
    });
    renderCardReport(countPresent, countTady, countExcusedAbsence, countUnxcusedAbsence);
}

function renderCardReport(countPresent, countTady, countExcusedAbsence, countUnxcusedAbsence) {
    document.getElementById("card-report").innerHTML =
        `<div class="col-md-3">
            <div class="card bg-success text-white">
                <div class="card-body">
                        <h5 class="card-title color">Có mặt</h5>
                        <p class="card-text" id="count-present">${countPresent}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-warning text-white">
                    <div class="card-body">
                        <h5 class="card-title color">Đi Muộn</h5>
                        <p class="card-text" id="count-tardy">${countTady}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-info text-white">
                    <div class="card-body">
                        <h5 class="card-title color">Nghỉ Có Phép</h5>
                        <p class="card-text" id="count-excused-absence">${countExcusedAbsence}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-danger text-white">
                    <div class="card-body">
                        <h5 class="card-title color">Nghỉ Không Phép</h5>
                        <p class="card-text" id="count-unexcused-absence">${countUnxcusedAbsence}</p>
                    </div>
                </div>
            </div>`
}

window.onload = renderStudent
