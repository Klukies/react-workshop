import { fireEvent, render, waitFor } from '@testing-library/react';
import nock from 'nock';
import { vi } from 'vitest';

import {
  CONVERT_KIT_API_FORM_ID_MOCK,
  CONVERT_KIT_API_URL_MOCK,
} from '../../../test/setup-test-env';
import type { Props } from '.';
import SignUp from '.';

const props: Props = {
  id: 'sign-up',
  isStartingOver: false,
  setIsStartingOver: vi.fn(),
  onSubscription: vi.fn(),
};

const convertKitUrl = `${CONVERT_KIT_API_URL_MOCK}/forms/${CONVERT_KIT_API_FORM_ID_MOCK}`;
const convertKitFetchMock = nock(convertKitUrl).post('/subscribe');

describe('SignUp', () => {
  it('can render with HTMLProps', () => {
    render(<SignUp {...props} />);

    expect(document.getElementById(props.id!)).toBeInTheDocument();
  });

  describe('the user submits the form', () => {
    describe('ConvertKit returns a subscription', () => {
      beforeAll(() => convertKitFetchMock.reply(200, { subscription: {} }));

      afterAll(() => vi.clearAllMocks());

      it('will trigger the onSubscription function', async () => {
        const { getByRole } = render(<SignUp {...props} />);

        const newsletterForm = getByRole('form');
        fireEvent.submit(newsletterForm);

        await waitFor(() => expect(props.onSubscription).toHaveBeenCalledTimes(1));
      });
    });

    describe('ConvertKit returns an error', () => {
      const errorMessage = 'Subscriber email is required';
      beforeAll(() => convertKitFetchMock.reply(200, { error: {}, message: errorMessage }));

      it('will render the error message', async () => {
        const { getByRole, getByText } = render(<SignUp {...props} />);

        const newsletterForm = getByRole('form');
        fireEvent.submit(newsletterForm);

        await waitFor(() => {
          expect(getByText(errorMessage)).toBeInTheDocument();
          expect(props.onSubscription).not.toHaveBeenCalled();
        });
      });
    });
  });
});
