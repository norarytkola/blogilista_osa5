import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import { tsExternalModuleReference } from '@babel/types';
import { isCompositeComponent } from 'react-dom/test-utils';

describe('Näkymän vaihtuminen nappia painamalla', () => {
  const blog = {
    author:'Testi Testaaja',
    title:'TestiBlogi',
    likes:3
  }
  const mockHandler = jest.fn()
  let component

  beforeEach(() => {
   component = render(
    <Blog blog={blog} onClick={mockHandler} />
  )
    })

test('Päänäkymässä pelkästään blogin nimet', ()=> {
      expect(component.container.querySelector('rajoitettu'))
    })
/* test('Nappia painamalla näkymä on laajempi', () =>{

  fireEvent.click(component)
  expect.container.querySelector('rajaamaton')
})
*/
  })
  
