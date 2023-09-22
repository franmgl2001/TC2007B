import React from 'react';
import { render } from '@testing-library/react';
import App from 'src/App.tsx'; 

test('renders App component', () => {
  
  const { getByText } = render(<App />);

  // Replace these assertions with actual elements or text from your App component
  const postsLabel = getByText('Posts');
  const usersLabel = getByText('Usuarios');
  const albumsLabel = getByText('Albumes');

  expect(postsLabel).toBeInTheDocument();
  expect(usersLabel).toBeInTheDocument();
  expect(albumsLabel).toBeInTheDocument();
});
