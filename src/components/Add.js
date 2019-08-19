import React from 'react';
import {useState, useEffect} from 'react';
import blogservice from '../services/blogservice'

const Add=(props)=>{
    const user=props.user
    const [title, addtitle]=useState('')
    const [author, addauthor]=useState('')
    const [url, addurl]=useState('')
    const [visible, setvisible]=useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [ok, lisaaok]=useState(null)

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
    if (user!=null){
    return(
       <>
       </>
    )} else{
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
                     )
        } 

    }
}
export default Add