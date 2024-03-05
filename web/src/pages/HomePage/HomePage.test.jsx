// web/src/pages/__tests__/HomePage.test.js
import { render, screen } from '@redwoodjs/testing/web';
import HomePage from '../HomePage/HomePage';

describe('HomePage', () => {
  // Tests that all elements render correctly
  it('renders successfully', () => {
    render(<HomePage />);
    expect(screen.getByText('SyntaxSwitch')).toBeInTheDocument(); // Header title renders
    expect(screen.getByText('The best code translator tool website')).toBeInTheDocument(); // Header subtitle renders
    expect(screen.getByText('Overview:')).toBeInTheDocument(); // Section title renders
    expect(screen.getByText('Quick Start:')).toBeInTheDocument(); // Section title renders
    expect(screen.getByText("SyntaxSwitch is a cutting-edge code translation tool designed to bridge the gap between different programming languages seamlessly. Leveraging the powerful GPT-3 API, it assists developers by converting code snippets, functions from one language to another with high accuracy. Whether you're dealing with legacy code, integrating with codebases in different languages, or simply curious to see how your code would look in another syntax, SyntaxSwitch makes the process intuitive and error-free. With our tool, you can ensure code correctness and save countless hours of manual translation.")).toBeInTheDocument(); // Section content renders
    expect(screen.getByText('Getting started with SyntaxSwitch is simple and straightforward. Here’s how you can begin translating your code in just a few clicks:')).toBeInTheDocument(); // Section content renders
    expect(screen.getByText('© 2024 SyntaxSwitch. All rights reserved.')).toBeInTheDocument(); // Footer content renders
  });

  // Placeholder for testing page load efficiency
  it('loads efficiently', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeTruthy(); // The page has rendered content
  });
});

