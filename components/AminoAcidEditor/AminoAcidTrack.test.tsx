import React from 'react';
import { render, screen } from '@testing-library/react';
import AminoAcidTrack from './AminoAcidTrack';

describe('AminoAcidTrack', () => {
  test('renders AminoAcidTrack component', () => {
    render(<AminoAcidTrack />);
    expect(screen.getByTestId('amino-acid-track')).toBeInTheDocument();
  });

  // Additional tests will be added here
});
