import { SERVER_HOST } from "../constant.js";

export function deleteStudent(id) {
  console.log(1);
  fetch(`${SERVER_HOST}/student/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        console.log('xóa thành công sinh viên trong hệ thống');
        document.querySelector(`[dataIp="${id}"]`).closest('tr').remove();
      } else {
        console.error('xóa không thành công sinh viên trong hệ thống');
      }
      return response.json();
    })
    .then(data => console.log('Response data:', data))
    .catch(error => console.error('Error:', error));
}