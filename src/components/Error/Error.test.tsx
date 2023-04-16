import { render } from '@testing-library/react';
import { Error } from './index';

describe('Error', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Error />);
    const errorMessage = getByText(/Error:/i);
    expect(errorMessage).toBeInTheDocument();
  });
});