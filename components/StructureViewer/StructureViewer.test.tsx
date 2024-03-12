import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StructureView from './StructureView';

// Mock useQuery to simulate a server error
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({
    isLoading: false,
    isError: true,
    error: { message: 'Server error' },
    data: undefined, // Simulate no data returned on error
  }),
}));

// Mock global objects and functions
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(global, '$3Dmol', {
  writable: true,
  value: {
    createViewer: jest.fn().mockReturnValue({
      addModel: jest.fn(),
      setStyle: jest.fn(),
      addSurface: jest.fn(),
      zoomTo: jest.fn(),
      render: jest.fn(),
      zoom: jest.fn(),
    }),
  },
});

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

  test('does not render StructureViewer when sequence prop is empty', () => {
    const emptySequenceProps = { ...mockProps, sequence: '' };
    render(
      <QueryClientProvider client={queryClient}>
        <StructureView {...emptySequenceProps} />
      </QueryClientProvider>
    );
    expect(screen.queryByTestId('structure-viewer')).not.toBeInTheDocument();
  });

  test('renders StructureViewer even when mutatedResidues prop is empty', () => {
    const emptyMutatedResiduesProps = { ...mockProps, mutatedResidues: [] };
    render(
      <QueryClientProvider client={queryClient}>
        <StructureView {...emptyMutatedResiduesProps} />
      </QueryClientProvider>
    );
    expect(screen.getByTestId('structure-viewer')).toBeInTheDocument();
  });

  test('renders StructureViewer without elementId prop', () => {
    const { elementId, ...noElementIdProps } = mockProps;
    render(
      <QueryClientProvider client={queryClient}>
        <StructureView {...noElementIdProps} />
      </QueryClientProvider>
    );
    expect(screen.getByTestId('structure-viewer')).toBeInTheDocument();
  });

  test('renders error message when there is a server error', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StructureView {...mockProps} />
      </QueryClientProvider>
    );
    // Check if the serverError state is set before checking for the error message
    await screen.findByTestId('structure-viewer');
    // Wait for the error message to be rendered before running the assertion
    const errorMessage = await screen.findByText(/There was an error fetching the structure prediction./i);
    expect(errorMessage).toBeInTheDocument();
  });

  // Additional tests can be added here
});
