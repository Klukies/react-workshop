import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';

import type { Props } from '.';
import SuccessMessage from '.';

const props: Props = {
  id: 'success-message',
  'aria-hidden': false,
  onStartOver: vi.fn(),
};

describe('SuccessMessage', () => {
  it('can render with HTMLProps', () => {
    render(<SuccessMessage {...props} />);

    /* 
      We can't retrieve the element through the testing library,
      but seeing as we're testing for HTMLProps we can query by id.
    */
    expect(document.getElementById(props.id!)).toBeInTheDocument();
  });

  describe('the user clicks the start over button', () => {
    it('will trigger the onStartOver function', () => {
      const { getByRole } = render(<SuccessMessage {...props} />);

      const startOverButton = getByRole('button');
      fireEvent.click(startOverButton);

      expect(props.onStartOver).toHaveBeenCalledTimes(1);
    });
  });
});
