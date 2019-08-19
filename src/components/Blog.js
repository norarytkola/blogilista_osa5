import React from 'react';
import {useState} from 'react'
import blogservice from '../services/blogservice'


const Blog = ({ blog }) => {
  const [visible, setVisible]=useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
    const [ok, lisaaok]=useState(null)
    
  const like =async(event)=>{
    const id=blog.id
    const number=Number(blog.likes +1)
    const tykatty={
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes:number
    }
    try{
    await blogservice
      .update(id, tykatty )
      lisaaok('Tykätty')
            setTimeout(() => {
              lisaaok(null)
            }, 5000)
          }
          catch(exception){
            setErrorMessage('Tykkäys ei onnistunut')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
      
  }}
  const poista =async()=>{
    const id=blog.id
    try 
    {const poistettu=await blogservice.remove(id)
      blog=blog.filter(poistettu)
      lisaaok('Poistettu')
            setTimeout(() => {
              lisaaok(null)
            }, 5000)
          }
          catch(exception){
            setErrorMessage('Poisto ei onnistu')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)  
  }}

if (visible===true){
  return(<><div className="ok">{ok}</div><div className="error">{errorMessage}</div>
    <div className="Blog"><div onClick={() => setVisible(false)}>
    Blogin nimi:  {blog.title} <br/>
    Tekijä: {blog.author} <br/>
    Url: {blog.url} <br/>
    Tykkäykset:{blog.likes}<br/>
    <button onClick={() => like()}>Tykkää</button>
    <button onClick={() => poista()}>Poista</button>
    </div>
  </div>
  </>
  )} else if (visible===false){

return(
  <><div className="ok">{ok}</div><div className="error">{errorMessage}</div>
  <div className="Blog"><div onClick={() => setVisible(true)}>
    Blogin nimi:  {blog.title} <br/>
    <button onClick={() => like()}>Tykkää</button>
    <button onClick={() => poista()}>Poista</button>
    </div>
  </div></>
)
}}

export default Blog