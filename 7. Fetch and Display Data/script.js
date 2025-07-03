const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

function fetchUsers() {
  userContainer.innerHTML = 'Loading...';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      displayUsers(users);
    })
    .catch((error) => {
      userContainer.innerHTML = `<p class="error">Failed to load users: ${error.message}</p>`;
    });
}

function displayUsers(users) {
  userContainer.innerHTML = ''; 
  
  users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-card');
    userDiv.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    userContainer.appendChild(userDiv);
  });
}

fetchUsers();

reloadBtn.addEventListener('click', fetchUsers);
