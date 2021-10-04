const { axios } = window

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
  })
}

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/index.html'
})

document.getElementById('goProfile').addEventListener('click', () => {
  window.location = '/profile.html'
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/auth.html'
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('deletePost')) {
    axios.delete(`/api/items/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

document.addEventListener('click', event => {
  if (event.target.className === 'isWatched') {
    const id = event.target.dataset.id

    axios.put(`/api/items/${id}`, 
    {
      isWatched: event.target.textContent !== 'Watched'
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        if (event.target.textContent === 'Watched') {
          event.target.textContent = 'Not Watched'
        } else {
          event.target.textContent = 'Watched'
        }
      })
      .catch(err => console.log(err)) 
  }
})

axios.get('/api/items', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: items }) => {
    items.forEach(({ _id, product, amznUrl, youtubeUrl, isWatched }) => {
      const itemElem = document.createElement('li')
      itemElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
      itemElem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${product}</div>
          <a href="${amznUrl}">Amazon Link</a>
          <a href="${youtubeUrl}">Amazon Link</a>
        </div>
        <button class="isWatched" data-id="${_id}">${isWatched ? 'Watched' : 'Not Watched'}</button>
        <span data-id="${_id}" class="deletePost badge bg-danger rounded-pill">x</span>
      `
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => console.error(err))
