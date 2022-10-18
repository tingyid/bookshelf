import {authenticate} from 'test/data/users'
import * as auth from 'auth-provider'
import {stableStringify} from 'react-query/dist/react-query.development'

const apiURL = process.env.REACT_APP_API_URL

function client(
  data,
  endpoint,
  {token, headers: customizedHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-type': data ? 'application/json' : undefined,
      ...customizedHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.statuc === 401) {
      await auth.logout()
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate'})
    }
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
