const { bootstrap } = window

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
  })
}

document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/register', {
    name: document.getElementById('name').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(() => alert('User registered! Log in.'))
    .catch(err => console.error(err))
})

document.getElementById('login').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/login', {
    name: document.getElementById('lName').value,
    username: document.getElementById('lUsername').value,
    password: document.getElementById('lPassword').value
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token)
        window.location = '/index.html'
      } else {
        alert('Invalid username or password.')
      }
    })
    .catch(err => console.error(err))
})
