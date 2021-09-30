const { axios } = window

document.getElementById('createItem').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/items', 
  {
    product: document.getElementById('product').value,
    amznUrl: document.getElementById('amznUrl').value,
    youtubeUrl: document.getElementById('youtubeUrl').value,
    isWatched: false
  }, 
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: { _id, product, amznUrl, youtubeUrl, isWatched } }) => {
      const itemElem = document.createElement('li')
      itemElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
      itemElem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${product}</div>
          <a href="${amznUrl}">Amazon Link</a>
          <a href="${youtubeUrl}">Youtube Link</a>
        </div>
        <button class="isWatched" data-id="${_id}">${isWatched ? 'Watched' : 'Not Watched'}</button>
      `
      document.getElementById('items').append(itemElem)
    })
    .catch(err => console.error(err))
})

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

axios.get('/api/items', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: items }) => {
    console.log(items)
    items.forEach(({ _id, product, amznUrl, youtubeUrl, isWatched }) => {
      const itemElem = document.createElement('li')
      itemElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
      itemElem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${product}</div>
          <a href="${amznUrl}">Amazon Link</a>
          <a href="${youtubeUrl}">Youtube Link</a>
        </div>
        <button class="isWatched" data-id="${_id}">${isWatched ? 'Watched' : 'Not Watched'}</button>
      `
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => {
    console.log(err)
    window.location = '/auth.html'
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