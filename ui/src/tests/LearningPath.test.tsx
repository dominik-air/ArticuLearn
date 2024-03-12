import { render, fireEvent, screen } from '@testing-library/react';
import LearningPath from '../components/LearningPath';

describe('LearningPath Component', () => {
  test('renders without crashing', () => {
    render(<LearningPath />);
    expect(screen.getByText(/Introduction/i)).toBeInTheDocument();
  });

  test('renders an ActivityNode for each activity', () => {
    render(<LearningPath />);
    const activityNodes = screen.getAllByRole('button');
    expect(activityNodes.length).toBe(3);
  });

  test('selecting an ActivityNode displays the Activity component with the correct info', () => {
    render(<LearningPath />);
    fireEvent.click(screen.getByText(/Exercise 1/i));
    expect(screen.getByText(/This is a placeholder description for Exercise 1/i)).toBeInTheDocument();
  });
});
