// web/src/components/NavBar/NavBar.test.js

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    const translatorLink = screen.getByText(/translator tool/i);
    const documentationLink = screen.getByText(/documentation/i);
    const feedbackLink = screen.getByText(/feedback/i);
    const loginLink = screen.getByText(/login\/signup/i);

    expect(homeLink).toBeInTheDocument();
    expect(translatorLink).toBeInTheDocument();
    expect(documentationLink).toBeInTheDocument();
    expect(feedbackLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test('navigates to correct routes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    const translatorLink = screen.getByText(/translator tool/i);
    const documentationLink = screen.getByText(/documentation/i);
    const feedbackLink = screen.getByText(/feedback/i);
    const loginLink = screen.getByText(/login\/signup/i);

    expect(homeLink.getAttribute('href')).toBe('/home');
    expect(translatorLink.getAttribute('href')).toBe('/translation-output');
    expect(documentationLink.getAttribute('href')).toBe('/Documentation');
    expect(feedbackLink.getAttribute('href')).toBe('/Feedback');
    expect(loginLink.getAttribute('href')).toBe('/login');
  });


});
