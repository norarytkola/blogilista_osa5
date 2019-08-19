import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import { tsExternalModuleReference } from '@babel/types';

test('Päänäkymässä pelkästään blogin nimet', ()=> {

    const blog = {
        author:'Testi Testaaja',
        title:'TestiBlogi',
        likes:3
      }
    
      const component = render(
        <Blog blog={blog} />
      )
      expect(component.container).toHaveTextContent(
        
      )
  
    })
