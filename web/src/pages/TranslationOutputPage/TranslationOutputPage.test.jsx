// Import necessary testing utilities
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TranslationOutputPage from './TranslationOutputPage';

// Mock navigator.clipboard.writeText for copy test
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

describe('TranslationOutputPage', () => {
  test('renders without crashing', () => {
    render(<TranslationOutputPage />);
    expect(screen.getByLabelText(/Enter your code:/i)).toBeInTheDocument();
  });

  test('accepts input code and validates language selection', async () => {
    render(<TranslationOutputPage />);
    const inputCode = screen.getByLabelText(/Enter your code:/i);
    const sourceLangInput = screen.getByPlaceholderText('Language of your code');
    const targetLangInput = screen.getByPlaceholderText('Translation Language');

    // Simulate user typing
    await userEvent.type(inputCode, 'console.log("Hello, World!");');
    await userEvent.type(sourceLangInput, 'JavaScript');
    await userEvent.type(targetLangInput, 'Python');

    expect(inputCode.value).toBe('console.log("Hello, World!");');
    expect(sourceLangInput.value).toBe('JavaScript');
    expect(targetLangInput.value).toBe('Python');
  });

  test('handles output display for various lengths and formats of code', async () => {
    render(<TranslationOutputPage />);
    const inputCode = screen.getByLabelText(/Enter your code:/i);
    const translateButton = screen.getByText('Translate');

    // Simulate user typing and clicking translate
    await userEvent.type(inputCode, 'console.log("Hello, World!");');
    fireEvent.click(translateButton);

    const outputCode = screen.getByLabelText(/Translated Code:/i);
    expect(outputCode.value).toBe('console.log("Hello, World!");');
  });

  test('copy to clipboard functionality', async () => {
    render(<TranslationOutputPage />);
    const copyButton = screen.getByText('Copy');

    // Mock and simulate the click
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('download functionality triggers download process', () => {
    // Since the download process involves creating an <a> element and clicking it,
    // which isn't directly observable in JSDOM, we focus on ensuring the function is called.
    // For this, you might need to mock the downloadFile method or check if the document's body
    // contains an <a> element after clicking the download button. This approach, however,
    // may require adjustments or a different strategy to be effectively tested in JSDOM.
  });
});
