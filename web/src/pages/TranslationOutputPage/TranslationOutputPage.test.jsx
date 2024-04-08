// Import necessary testing utilities
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TranslationOutputPage, { sanitizeInput } from './TranslationOutputPage'; // Import the component and the sanitizeInput function
import { MockProviders } from '@redwoodjs/testing/web';
import { preprocessCode } from '../../../../server'; 
import * as server from '../../../../server';


// Mock navigator.clipboard.writeText for the copy to clipboard test
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

// Setup to mock window.alert globally
beforeAll(() => {
  window.alert = jest.fn();
});

// Mock lang-detector module for accurate language detection
jest.mock('lang-detector', () => {
  return jest.fn((code) => {
    if (code.includes('cout <<')) return 'cpp'; // Simulate detecting C++ (as an example of unsupported language)
    return 'javascript'; // Default mock return value
  });
});

// Mock the OpenAI class
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: 'Translated code' } }]
          })
        }
      }
    };
  });
});

const handleFailedRequest = async () => {
  try {
    await mockFailedRequest(); // This function should simulate the failed API request
  } catch (error) {
    setError(true); // Set state to indicate error
  }
};

describe('TranslationOutputPage', () => {
  it('renders without crashing', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );
    const translateButton = await screen.findByRole('button', { name: /Translate/i });
    expect(translateButton).toBeInTheDocument();
  });

  test('accepts input code and validates language selection', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );
    const inputCode = screen.getByLabelText(/Enter your code:/i);
    const sourceLangSelect = screen.getByLabelText('Language of your code:');
    const targetLangSelect = screen.getByLabelText('Translation Language:');

    await userEvent.type(inputCode, 'console.log("Hello, World!");');
    fireEvent.change(sourceLangSelect, { target: { value: 'javascript' } });
    fireEvent.change(targetLangSelect, { target: { value: 'python' } });

    expect(inputCode.value).toBe('console.log("Hello, World!");');
    expect(sourceLangSelect.value).toBe('javascript');
    expect(targetLangSelect.value).toBe('python');
  });

  test('handles output display for various lengths and formats of code', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );
    const inputCode = screen.getByLabelText(/Enter your code:/i);
    const translateButton = screen.getByText('Translate');

    await userEvent.type(inputCode, 'console.log("Hello, World!");');
    fireEvent.click(translateButton);

    // Mock the translated output display and assertions accordingly
  });

  test('copy to clipboard functionality', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );
    const copyButton = screen.getByText('Copy');

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('download functionality triggers download process', () => {
    // Test download functionality as needed
  });

  test('accurate language detection', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );

    const inputCode = screen.getByLabelText(/Enter your code:/i);
    await userEvent.type(inputCode, 'print("Hello, World!")');
    const sourceLangSelect = screen.getByLabelText('Language of your code:');
    expect(sourceLangSelect.value).toBe('javascript');
  });

  test('proper handling of different code structures', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );
  
    const inputCode = screen.getByLabelText(/Enter your code:/i);
    const translateButton = screen.getByText('Translate');
  
    // Clear the input field
    inputCode.value = '';
  
    // Set the value of the input field
    inputCode.value = 'function add(a, b) {\n  return a + b;\n}';
  
    // Trigger change event
    fireEvent.change(inputCode);
  
    fireEvent.click(translateButton);
  
    // Add assertions here to verify the translated output
  });
  
  

  test('appropriate pre-processing and post-processing steps', () => {
    // Mock necessary dependencies
    // Import preprocessCode function
    const { preprocessCode } = require('../../../../server');
  
    // Test cases for preprocessCode function
    // You can add more test cases as needed to cover different scenarios
    // Mocked input code with different structures
    const inputCode1 = 'console.log("Hello, World!");'; // No comments
    const inputCode2 = `
      // This is a comment
      console.log("Hello, World!");
    `; // Code with a single-line comment
    const inputCode3 = `
      /*
        Multi-line
        comment
      */
      console.log("Hello, World!");
    `; // Code with a multi-line comment
    const inputCode4 = `
      // This is a comment
      /*
        Multi-line
        comment
      */
      console.log("Hello, World!");
    `; // Code with both single-line and multi-line comments
  
    // Test preprocessCode function with different input code structures
    const outputCode1 = preprocessCode(inputCode1, 'javascript');
    const outputCode2 = preprocessCode(inputCode2, 'javascript');
    const outputCode3 = preprocessCode(inputCode3, 'javascript');
    const outputCode4 = preprocessCode(inputCode4, 'javascript');
  
    // Assert that the output code after preprocessing does not contain any comments
    expect(outputCode1).not.toMatch(/\/\/.*|\/\*[\s\S]*?\*\/|#+.*/g); // No comments
    expect(outputCode2).not.toMatch(/\/\/.*|\/\*[\s\S]*?\*\/|#+.*/g); // No comments
    expect(outputCode3).not.toMatch(/\/\/.*|\/\*[\s\S]*?\*\/|#+.*/g); // No comments
    expect(outputCode4).not.toMatch(/\/\/.*|\/\*[\s\S]*?\*\/|#+.*/g); // No comments
  });
  
});

describe('Sanitization Logic', () => {
  it('should sanitize input by removing HTML tags', () => {
    const inputCode = '<script>alert("Hack!")</script>console.log("Hello, world!");';
    const expectedOutput = '&lt;script&gt;alert(\"Hack!\")&lt;/script&gt;console.log(\"Hello, world!\");';
    expect(sanitizeInput(inputCode)).toBe(expectedOutput);
  });
});


import { mockSuccessRequest, mockFailedRequest } from '../../../../server'; // Import mock API functions

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: 'Translated code' } }]
          })
        }
      }
    };
  });
});

describe('TranslationOutputPage', () => {
  // Test handling a successful API request
  test('handles a successful API request', async () => {
    // Mock a successful API request
    mockSuccessRequest();

    // Render the component
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    );

    // Assert that the component behaves as expected
  });

// Test for handling a failed API request
test('handles a failed API request', async () => {
  // Mock a failed API request
  const mockFailedRequest = jest.spyOn(server, 'mockFailedRequest').mockRejectedValue(new Error('Mock error'));

  // Mock the window.alert method
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(
    <MockProviders>
      <TranslationOutputPage />
    </MockProviders>
  );

  // Trigger the action that causes the failed request
  const translateButton = screen.getByRole('button', { name: /translate/i });
  userEvent.click(translateButton);

  // Wait for the alert to be called
  await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledWith('Please log in to translate and save your code.');
  });

  // Restore the original functions after the test
  mockFailedRequest.mockRestore();
  mockAlert.mockRestore();
});

const request = require('supertest');
const { app } = require('../../../../server'); // Adjust the path as necessary

describe('/translate-code endpoint', () => {
  it('should translate code successfully', async () => {
    const response = await request(app)
      .post('/translate-code')
      .send({
        inputCode: 'console.log("Hello, World!");',
        sourceLang: 'javascript',
        targetLang: 'python',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.translatedCode).toBeDefined();
  });

  it('Testing Error for unsupported languages', async () => {
    const response = await request(app)
      .post('/translate-code')
      .send({
        inputCode: 'cout << "Thanks for viewing my code!";',
        sourceLang: 'cobol', // Unsupported language
        targetLang: 'python',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  // Add more tests here for other scenarios and edge cases
});





});
