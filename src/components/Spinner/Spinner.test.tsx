import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { Spinner } from './index';

describe('Spinner', () => {
  it('renders correctly', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toMatchSnapshot();
  });
});