import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActivityNode from '../components/ActivityNode';

describe('ActivityNode', () => {
  const mockOnSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with green background for done status', () => {
    const activity = { id: '1', name: 'Activity 1', type: 'video', status: 'done' };
    render(<ActivityNode activity={activity} onSelect={mockOnSelect} />);
    const node = screen.getByTestId('activity-node');
    expect(node).toHaveStyle('backgroundColor: green');
  });

  it('calls onSelect with activity id on mouse enter', () => {
    const activity = { id: '1', name: 'Activity 1', type: 'video', status: 'current' };
    render(<ActivityNode activity={activity} onSelect={mockOnSelect} />);
    const node = screen.getByTestId('activity-node');
    fireEvent.mouseEnter(node);
    expect(mockOnSelect).toHaveBeenCalledWith(activity.id);
  });
});
