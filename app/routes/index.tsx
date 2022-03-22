import { useState } from 'react';

import SignUp from '~/components/SignUp';
import SuccessMessage from '~/components/SuccessMessage';

const Index = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);

  return (
    <main>
      <SignUp aria-hidden={isSuccessful} />
      <SuccessMessage aria-hidden={!isSuccessful} />
    </main>
  );
};

export default Index;
