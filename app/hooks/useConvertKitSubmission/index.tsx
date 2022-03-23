import { useState } from 'react';

type ConvertKitResponse = {
  error?: string;
  message?: string;
  subscription?: Record<string, string>;
};

type SubscribeToConvertKitParams = {
  email?: string;
  onSubscription: () => void;
};

const useConvertKitSubmission = () => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const subscribeToConvertKit = async ({ email, onSubscription }: SubscribeToConvertKitParams) => {
    // Reset the error message on each submission
    setErrorMessage(undefined);

    const { CONVERT_KIT_API_URL, CONVERT_KIT_API_FORM_ID, CONVERT_KIT_API_KEY } = window.ENV;
    const subscribeUrl = `${CONVERT_KIT_API_URL}/forms/${CONVERT_KIT_API_FORM_ID}/subscribe`;

    const response = await fetch(subscribeUrl, {
      method: 'post',
      body: JSON.stringify({ email, api_key: CONVERT_KIT_API_KEY }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

    // Cast the result to a response that could come from convert kit
    // Note: this should be a union type based on success/error but this also works to keep it simple :D
    const convertKitResponse = (await response.json()) as ConvertKitResponse;

    if (convertKitResponse.error) {
      return setErrorMessage(convertKitResponse.message);
    }

    return onSubscription();
  };

  return { errorMessage, subscribeToConvertKit };
};

export default useConvertKitSubmission;
