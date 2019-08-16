import React from 'react'


const Blog = ({ blog }) => (
  <div className="Blog">
    Blogin nimi:  {blog.title} <br/>
    Tekijä:  {blog.author}
  </div>
)

export default Blog