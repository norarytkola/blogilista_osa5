import React from 'react';
import './index.css';
import Blog from './components/Blog';
import {useState, useEffect} from 'react';
import blogservice from './services/blogservice'
import loginService from './services/login';
import {useField} from './hook'


const App =(props)=> {

const [errorMessage, setErrorMessage] = useState(null)
const [ok, lisaaok]=useState(null)
const [user, setuser]=useState(null)
const [title, addtitle]=useState('')
const [author, addauthor]=useState('')
const [url, addurl]=useState('')
const [visible, setvisible]=useState(false)

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
        addblogs(blogs.concat(blogi))
      }
      catch(exception){
        setErrorMessage('Blogin lisäys ei onnistunut')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser', u)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setuser(user)
    blogservice.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const us = await loginService.login({
        username:u,
        password:p
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(us)
      ) 
      blogservice.setToken(us.token)
      setuser(us)
      //addusername('')
      //addpassword('')
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
  const addFrom=() =>{
    if (visible===true){
      return(<>
          <div className="ok">{ok}</div><div className="error">{errorMessage}</div>
      <form onSubmit={add}>
              title:  <input value={title} onChange={({ target }) => addtitle(target.value)} /><br/>
              author: <input value={author} onChange={({ target }) => addauthor(target.value)} /><br/>
              url:    <input value={url} onChange={({ target }) => addurl(target.value)} /><br/>
                  <button type="submit" >lisää</button>
                  <button onClick={() => setvisible(false)}>Peruuta</button>
             </form></>)}
   else {
      return(
       <><button onClick={() => setvisible(true)}>Lisää blogi</button></>
      )}}

  const userName=useField('text')
  const u=userName.value
  const passWord=useField('password')
  const p=passWord.value

  const loginForm =()=> {
      return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          Name:       <input {...userName}/><button onClick={userName.reset}>Tyhjennä kenttä</button>
          <br/>
          Password:   <input {...passWord}/><button onClick={passWord.reset}>Tyhjennä kenttä</button>
          <br/>
          <button type="submit">Sign in</button>
        </form>
      </div>
  )}

  const poista =async(id)=>{
    try {
      await blogservice.remove(id)
      lisaaok('Poistettu')
            setTimeout(() => {
              lisaaok(null)
            }, 5000)
           addblogs(blogs.filter(blog=>blog.id !== id))
          }
          catch(exception){
            setErrorMessage('Poisto ei onnistu')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)  
  }}
  
  blogs.sort((a, b) => b.likes - a.likes)
  const bloglist=()=>(
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} poista={() => poista(blog.id)}/>
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
          {addFrom()}
          <div className="nappi"><button onClick={ulos}>Kirjaudu ulos</button></div>
        </div>
      }
      </>
    ) 
    
}

export default App;