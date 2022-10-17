function client(endpoint, customConfig = {}) {
  // 🐨 call window.fetch(fullURL, config) then handle the json response
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const config = {
    method: 'GET',
    ...customConfig,
  }
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}
