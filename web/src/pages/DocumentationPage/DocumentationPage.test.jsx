import { render, screen, fireEvent } from '@redwoodjs/testing/web';
import DocumentationPage from '../DocumentationPage/DocumentationPage';
import { faqs } from './DocumentationPage';

describe('DocumentationPage', () => {
  beforeEach(() => {
    render(<DocumentationPage />);
  });

  it('renders successfully and displays initial UI components', () => {
    expect(screen.getByText('Documentation and Help Section')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search FAQs')).toBeInTheDocument();
    // Ensure initial state shows all FAQs
    faqs.forEach(faq => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('filters FAQs based on search input correctly', () => {
    // Simulate typing into the search box with specific keywords
    fireEvent.change(screen.getByPlaceholderText('Search FAQs'), { target: { value: 'API status' } });
    // Expect to see related FAQ and not see unrelated ones
    expect(screen.getByText('Can I check the API status?')).toBeInTheDocument();
    expect(screen.queryByText('How do I start translating code?')).not.toBeInTheDocument();
  });

  it('displays no FAQs found message for unmatched search queries', () => {
    fireEvent.change(screen.getByPlaceholderText('Search FAQs'), { target: { value: 'unmatched query' } });
    expect(screen.getByText('No FAQs found matching your search criteria.')).toBeInTheDocument();
  });

  it('verifies that all User Guides and Other Resources links are accessible and have correct href attributes', () => {
    // Assuming you have an array or object of links for easier management and verification
    const links = [
      { text: '- HomePage', href: '/home' },
      { text: '- Feedback', href: '/contact-us' },
      { text: '- Github', href: 'https://github.com/Munavvarh/CS490_Project_Spring24_' },
      // Add other links similarly
    ];

    links.forEach(link => {
      const linkElement = screen.getByText(link.text).closest('a');
      expect(linkElement).toHaveAttribute('href', link.href);
    });
  });

  // Additional Test: Ensure external links are marked to open in a new tab
  it('ensures external links are marked to open in a new tab', () => {
    const externalLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href').startsWith('http'));
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
