// Import necessary testing utilities
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MockProviders } from '@redwoodjs/testing/web'

import TranslationOutputPage from './TranslationOutputPage'
//import { fireEvent, render, screen } from '@redwoodjs/testing';

// Mock navigator.clipboard.writeText for the copy to clipboard test
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
})

// Setup to mock window.alert globally
beforeAll(() => {
  window.alert = jest.fn()
})

describe('TranslationOutputPage', () => {
  it('renders without crashing', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    )
    // Use findByText for potentially asynchronous elements
    const translateButton = await screen.findByRole('button', {
      name: /Translate/i,
    })
    expect(translateButton).toBeInTheDocument()
  })

  test('handles server error during translation', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    )

    const inputCode = screen.getByLabelText(/Enter your code:/i)
    const translateButton = screen.getByText('Translate')

    // Simulate user input and click on translate
    await userEvent.type(inputCode, 'console.log("Hello, World!");')
    fireEvent.click(translateButton)

    // Mock the fetch function to simulate server error
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Server error'))

    // Assertions
    expect(window.alert).toHaveBeenCalledWith(
      'An error occurred. Please try again.'
    )
    // Check if error is stored in the database
    expect(createError).toHaveBeenCalledWith({
      variables: {
        input: {
          translationId: expect.any(String), // Ensure translation ID is provided
          title: 'Error',
          description: 'Server error',
        },
      },
    })

    // Clean up
    global.fetch.mockRestore()
  })

  test('accepts input code and validates language selection', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    )
    const inputCode = screen.getByLabelText(/Enter your code:/i)
    // Use getByLabelText for dropdowns
    const sourceLangSelect = screen.getByLabelText('Language of your code:')
    const targetLangSelect = screen.getByLabelText('Translation Language:')

    // Simulate user typing in the code area
    await userEvent.type(inputCode, 'console.log("Hello, World!");')
    // Simulate selecting languages from the dropdowns
    fireEvent.change(sourceLangSelect, { target: { value: 'javascript' } })
    fireEvent.change(targetLangSelect, { target: { value: 'python' } })

    // Assertions to check if the inputs contain the expected values
    expect(inputCode.value).toBe('console.log("Hello, World!");')
    // For dropdowns, we verify if the selected option is correct
    expect(sourceLangSelect.value).toBe('javascript')
    expect(targetLangSelect.value).toBe('python')
  })

  test('handles output display for various lengths and formats of code', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    )
    const inputCode = screen.getByLabelText(/Enter your code:/i)
    const translateButton = screen.getByText('Translate')

    // Simulate user typing and clicking translate
    await userEvent.type(inputCode, 'console.log("Hello, World!");')
    fireEvent.click(translateButton)

    // Since the output is part of a mocked response, include your mock logic or
    // adjust expectations based on how your component and services are implemented.
  })

  test('copy to clipboard functionality', async () => {
    render(
      <MockProviders>
        <TranslationOutputPage />
      </MockProviders>
    )
    const copyButton = screen.getByText('Copy')

    // Mock and simulate the click on the copy button
    fireEvent.click(copyButton)

    // Check if the clipboard writeText function was called
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })

  test('download functionality triggers download process', () => {
    // This test would be for ensuring the trigger for the download process.
    // Implement based on how your download functionality is structured,
    // potentially requiring mocking of document methods or checking for
    // specific elements' existence or events.
  })
})

const { sanitizeInput } = require('./TranslationOutputPage')

describe('Sanitization Logic', () => {
  it('should sanitize input by removing HTML tags', () => {
    const inputCode =
      '&lt;script&gt;alert("Hack!")&lt;/script&gt;console.log("Hello, world!");'
    const expectedOutput =
      '&amp;lt;script&amp;gt;alert("Hack!")&amp;lt;/script&amp;gt;console.log("Hello, world!");'
    expect(sanitizeInput(inputCode)).toBe(expectedOutput)
  })
})
