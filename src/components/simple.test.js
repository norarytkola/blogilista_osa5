import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import SimpleBlog from './SimpleBlog';
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

test('renders author, title, likes', () => {
    const blog = {
      author:'Testi Testaaja',
      title:'TestiBlogi',
      likes:3
    }
    const component = render(
      <SimpleBlog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'Testi Testaaja', 'Testiblogi', 3
    )

  })
test('Like-button is working', () =>{
  const blog = {
    author:'Testi Testaaja',
      title:'TestiBlogi2',
      likes:3
  }
  const mockHandler = jest.fn()
  const element = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )
  const button = element.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  
  button

})