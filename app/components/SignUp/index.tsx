import type { ChangeEvent, Dispatch, FormEvent, HTMLProps, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

import useConvertKitSubmission from '~/hooks/useConvertKitSubmission';

export type Props = HTMLProps<HTMLFormElement> & {
  isStartingOver: boolean;
  setIsStartingOver: Dispatch<SetStateAction<boolean>>;
  onSubscription: () => void;
};

const SignUp = ({ isStartingOver, setIsStartingOver, onSubscription, ...formProps }: Props) => {
  const { errorMessage, subscribeToConvertKit } = useConvertKitSubmission();
  const [email, setEmail] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await subscribeToConvertKit({ email, onSubscription });
  };

  useEffect(() => {
    if (isStartingOver) {
      inputRef.current?.focus();
      setIsStartingOver(false);
    }
  }, [isStartingOver, setIsStartingOver]);

  return (
    // https://github.com/typescript-eslint/typescript-eslint/issues/4650
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form name="newsletterForm" onSubmit={handleSubmit} {...formProps}>
      <h2>Subscribe!</h2>
      <p>Don't miss any of the action!</p>
      <fieldset>
        <input
          aria-label="Email address"
          aria-describedby="error-message"
          ref={inputRef}
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="you@example.com"
        />
        <button type="submit">Subscribe</button>
      </fieldset>

      {errorMessage && <p id="error-message">{errorMessage}</p>}
    </form>
  );
};

export default SignUp;
