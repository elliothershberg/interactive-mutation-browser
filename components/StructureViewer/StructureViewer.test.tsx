import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StructureView from './StructureView';

describe('StructureViewer', () => {
  const mockProps = {
    sequence: 'ATCG',
    elementId: 'structure-element',
    mutatedResidues: ['A', 'T'],
  };

  const queryClient = new QueryClient();

  test('renders StructureViewer component with provided props', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StructureView {...mockProps} />
      </QueryClientProvider>
    );
    expect(screen.getByTestId('structure-viewer')).toBeInTheDocument();
  });

  // Additional tests can be added here
});
