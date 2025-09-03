import { render, screen, fireEvent } from '@testing-library/react';
import RatingSystem from '../RatingSystem';

describe('RatingSystem', () => {
  it('renders correctly with default props', () => {
    render(<RatingSystem />);
    expect(screen.getByText('Not rated')).toBeInTheDocument();
  });

  it('displays initial rating', () => {
    render(<RatingSystem initialRating={4} />);
    expect(screen.getByText('4/5')).toBeInTheDocument();
  });

  it('calls onRatingChange when rating is clicked', () => {
    const mockOnRatingChange = jest.fn();
    render(<RatingSystem onRatingChange={mockOnRatingChange} />);
    
    const thirdStar = screen.getByLabelText('Rate 3 stars');
    fireEvent.click(thirdStar);
    
    expect(mockOnRatingChange).toHaveBeenCalledWith(3);
  });

  it('is non-interactive when readonly', () => {
    const mockOnRatingChange = jest.fn();
    render(<RatingSystem readonly onRatingChange={mockOnRatingChange} />);
    
    const firstStar = screen.getByLabelText('Rate 1 star');
    fireEvent.click(firstStar);
    
    expect(mockOnRatingChange).not.toHaveBeenCalled();
  });
});