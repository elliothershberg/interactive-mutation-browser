import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom custom matchers
import AminoAcidEditor from './AminoAcidEditor';

describe('AminoAcidEditor', () => {
  test('renders AminoAcidEditor component', () => {
    render(<AminoAcidEditor />);
    expect(screen.getByTestId('amino-acid-editor')).toBeInTheDocument();
  });

  // Test default values
  test('renders with default values', () => {
    render(<AminoAcidEditor />);
    expect(screen.getByTestId('amino-acid-editor-input')).toHaveValue('');
  });

  // Test user interaction
  test('updates on user input', () => {
    render(<AminoAcidEditor />);
    const input = screen.getByTestId('amino-acid-editor-input');
    fireEvent.change(input, { target: { value: 'A' } });
    expect(input).toHaveValue('A');
  });

  // Test clearing input
  test('clears input on user interaction', () => {
    render(<AminoAcidEditor />);
    const input = screen.getByTestId('amino-acid-editor-input');
    fireEvent.change(input, { target: { value: 'A' } });
    // Simulate user clearing the input
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });

  // Test rendering of child components
  test('renders AminoAcidTrack component', () => {
    render(<AminoAcidEditor />);
    expect(screen.getByTestId('amino-acid-track')).toBeInTheDocument();
  });

  test('renders AminoAcidSequence component', () => {
    render(<AminoAcidEditor />);
    expect(screen.getByTestId('amino-acid-sequence')).toBeInTheDocument();
  });

  // Add more tests here as needed
});
