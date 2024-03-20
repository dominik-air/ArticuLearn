import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Activity from '../components/Activity'; 

describe('Activity Component', () => {
  const mockOnStart = jest.fn();

  beforeEach(() => {
    mockOnStart.mockClear();
  });

  it('renders correctly with exercise type and start button', () => {
    render(<Activity name="Run" description="A nice run in the park" type="exercise" started={false} onStart={mockOnStart} />);
    expect(screen.getByText('Run')).toBeInTheDocument();
    expect(screen.getByText('A nice run in the park')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByTestId('FitnessCenterIcon')).toBeInTheDocument();
  });

  it('renders correctly with quiz type and continue button', () => {
    render(<Activity name="Math Quiz" description="Test your math skills" type="quiz" started={true} onStart={mockOnStart} />);
    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
    expect(screen.getByText('Test your math skills')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    expect(screen.getByTestId('QuizIcon')).toBeInTheDocument();
  });

  it('calls onStart when the button is clicked', () => {
    render(<Activity name="Read Article" description="Learn about history" type="article" started={false} onStart={mockOnStart} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });
});

