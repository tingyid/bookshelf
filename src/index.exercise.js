import React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function LoginForm({onSubmit, buttonText}) {
  function handleSumit(event) {
    event.preventDefault()
    const [username, password] = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSumit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}
function App() {
  const [openModel, setOpenModel] = React.useState('none') // three states: none, login, register

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log(' ', formData)
  }
  return (
    <div>
      <Logo width="80" height="80" />
      <div>
        <h1>Bookshelf</h1>
      </div>
      <div>
        <button onClick={() => setOpenModel('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModel('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModel === 'login'}>
        <div>
          <button onClick={() => setOpenModel('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText={'Login'} />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModel === 'register'}>
        <div>
          <button onClick={() => setOpenModel('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText={'Register'} />
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
