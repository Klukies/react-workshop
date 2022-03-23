import { useState } from 'react';

import SignUp from '~/components/SignUp';
import SuccessMessage from '~/components/SuccessMessage';

const Index = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubscription = () => setIsSuccessful(true);

  return (
    <main>
      <SignUp aria-hidden={isSuccessful} onSubscription={handleSubscription} />
      <SuccessMessage aria-hidden={!isSuccessful} />
    </main>
  );
};

export default Index;
