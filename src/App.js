import React from 'react';
import './index.css';
import Blog from './components/Blog';
import {useState, useEffect} from 'react';
import blogservice from './services/blogservice'
import loginService from './services/login';
import Add from './components/Add';
import PropTypes from 'prop-types'

const App =(props)=> {

const [username, addusername]=useState('')
const [password, addpassword]=useState('')
const [errorMessage, setErrorMessage] = useState(null)
const [ok, lisaaok]=useState(null)
const [user, setuser]=useState(null)

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser', username)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setuser(user)
    blogservice.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogservice.setToken(user.token)
      setuser(user)
      addusername('')
      addpassword('')
      lisaaok('Onnistunut sisäänkirjautuminen')
      setTimeout(() => {
        lisaaok(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Tarkista kirjautumistiedot')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  } 
const ulos =async (event) =>{
  window.localStorage.clear()
  blogservice.setToken(null)
  setuser(null)
}

const [blogs, addblogs] =useState([])
  useEffect(() => {
   blogservice
    .getAll()
     .then(blogi=>
      addblogs(blogi))
    }, [])

  const loginForm =()=> {
      return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          Name:       <input value={username} onChange={({ target }) => addusername(target.value)}/>
          <br/>
          Password:   <input type="password" value={password} onChange={({ target }) => addpassword(target.value)}/>
          <br/>
          <button type="submit">Sign in</button>
        </form>
      </div>
  )}
 

  const bloglist=()=>(
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} />
        )}
      </div>
    )
 
    return (
      <><h1>Blogit</h1>
      <div className="error">{errorMessage}</div>
      <div className="ok">{ok}</div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {bloglist()}
          <Add />
          <div className="nappi"><button onClick={ulos}>Kirjaudu ulos</button></div>
        </div>
      }
      </>
    ) 
    
}

export default App;