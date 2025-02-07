import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../src/components/Footer'
 
describe('Footer', () => { 
    it('renders the navigation links', () => {
      render(<Footer />);
  
      // Check for each navigation link
      const links = [
        { href: '#explore', text: 'Explore Volunteering' },
        { href: '#terms', text: 'Terms & Conditions' },
        { href: '#privacy', text: 'Privacy Policy' },
        { href: '#contact', text: 'Contact Us' },
      ];
  
      links.forEach(({ href, text }) => {
        const link = screen.getByRole('link', { name: text });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
      });
    });
  });
