/* eslint-disable no-undef */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function listTodo() {
  return fetch('api/todos', { headers })
    .then(checkStatus)
    .then(parseJSON);
}

export function addTodo(content) {
  return fetch('api/todos', {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ todo: { content } })
  }).then(checkStatus)
    .then(parseJSON);
}

export function toggleDoneTodo(id) {
  return fetch('api/todos/' + id, {
    headers: headers,
    method: 'PUT'
  }).then(checkStatus)
    .then(parseJSON);
}
