import { SERVER_HOST } from "../constant.js";

export function deleteClass(id) {
  fetch(`${SERVER_HOST}/class/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        console.log('xóa thành công trong hệ thống');
        document.querySelector(`[data-id="${id}"]`).closest('tr').remove();
      } else {
        console.error('xóa không thành công trong hệ thống');
      }
      return response.json();
    })
    .then(data => console.log('Response data:', data))
    .catch(error => console.error('Error:', error));
}





