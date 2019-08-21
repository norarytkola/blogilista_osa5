import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
jest.mock('./services/blogs')
import { render,  waitForElement } from '@testing-library/react'

describe('<App />', () => {


  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in to application')
    )}) 
 /*  test('logged user can see the blogs',async () =>{
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    await waitForElement(
      () => component.getByText('Blogs')
    )}) */
  })

