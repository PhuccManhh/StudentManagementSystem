import { get, post } from "../method.js"
import { SERVER_HOST } from "../constant.js";
const selectShiftElement = document.getElementById('select-shift');
const selectClassElement = document.getElementById('select-class');

function renderSelectClass() {
    get(SERVER_HOST + '/class').then(data => {
        const options = data.data;
        options.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            selectClassElement.appendChild(option);
        });
        selectClassElement.value = options[0].id;
    })
}

document.getElementById('submit-attendance-session').onclick = function () {
    const shiftValue = selectShiftElement.value;
    const classValue = selectClassElement.value;
    const body = {};
    body.class_id = parseInt(classValue);
    body.shift_id = parseInt(shiftValue);
    post(SERVER_HOST + '/class/new-attendance-session', body).
        then(data => {
            console.log(data);
            const attendanceSessionData = data.data;
            window.location.href = '/pages/attendanceCheck/index.html?id=' + attendanceSessionData.id + "&class=" + attendanceSessionData.class_id;
        });
}

function renderSelectShift() {
    get(SERVER_HOST + '/shift').then(data => {
        const options = data.data;
        options.forEach((item) => {
            const time = item.check_in + " - " + item.check_out;
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name + " ( " + time + " )";
            selectShiftElement.appendChild(option);
        });
        selectShiftElement.value = options[0].id;
    })
}

window.onload = function () {
    renderSelectClass();
    renderSelectShift();
};