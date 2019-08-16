import React from 'react';
import './index.css';
import Blog from './components/Blog';
import {useState, useEffect} from 'react';
import blogservice from './services/blogservice'
import loginService from './services/login'

const App =()=> {

const [username, addusername]=useState('')
const [password, addpassword]=useState('')
const [errorMessage, setErrorMessage] = useState(null)
const [ok, lisaaok]=useState(null)
const [user, setuser]=useState(null)
const [title, addtitle]=useState('')
const [author, addauthor]=useState('')
const [url, addurl]=useState('')

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser', username)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setuser(user)
    blogservice.setToken(user.token)
  }
}, [])

const add =async(event)=> {
  event.preventDefault()
  if (title===''|| url===''){
    setErrorMessage('Täytä kaikki kentät')
  }else {
    try {
      const blogi={
        title:title,
        author:author,
        url:url
      }
      await blogservice.create(blogi)
      lisaaok('Blogin lisäys onnistui')
      setTimeout(() => {
        lisaaok(null)
      }, 5000)
      addtitle('')
      addauthor('')
      addurl('')
    }
    
    catch(exception){
      setErrorMessage('Blogin lisäys ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
}
  
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

  const loginForm =()=> (
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
  )

  const bloglist=()=>(
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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
          <form onSubmit={add}>
            title:  <input value={title} onChange={({ target }) => addtitle(target.value)} /><br/>
            author: <input value={author} onChange={({ target }) => addauthor(target.value)} /><br/>
            url:    <input value={url} onChange={({ target }) => addurl(target.value)} /><br/>
                <button type="submit" >lisää</button>
                </form>
          <div className="nappi"><button onClick={ulos}>Kirjaudu ulos</button></div>
        </div>
      }</>
    ) 
}

export default App;