import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '../components/Badge';

describe('Badge Component', () => {
  const userName = 'John Doe';
  const achievement = 'Completing the Marathon';
  const imageUrl = 'http://example.com/image.jpg';

  it('renders correctly with all props', () => {
    render(<Badge userName={userName} achievement={achievement} imageUrl={imageUrl} />);

    expect(screen.getByText(`Congratulations, ${userName}!`)).toBeInTheDocument();
    expect(screen.getByText(`You've achieved: ${achievement}`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Achievement' })).toHaveAttribute('src', imageUrl);
    expect(screen.getByText('Share your achievement')).toBeInTheDocument();
  });

  it('renders correctly without an image URL', () => {
    render(<Badge userName={userName} achievement={achievement} />);

    expect(screen.queryByRole('img', { name: 'Achievement' })).not.toBeInTheDocument();
  });

  it('includes the Share button with a Star icon', () => {
    render(<Badge userName={userName} achievement={achievement} imageUrl={imageUrl} />);

    const shareButton = screen.getByText('Share your achievement');
    expect(shareButton).toBeInTheDocument();
    expect(shareButton.closest('button')).toContainElement(screen.getByTestId('StarIcon'));
  });
});
