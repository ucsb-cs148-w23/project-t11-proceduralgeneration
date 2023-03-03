import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Header';

test('should render header component', () => {
  render(<Header/>);
  const headerElement = screen.getByTestId('header');

  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent('3D Environment Procedural Generator')
})

test('sanity check', () => {
  expect(true).toBe(true);
})


