import '@testing-library/jest-dom/extend-expect';

import { installGlobals } from '@remix-run/node/globals';

export const CONVERT_KIT_API_URL_MOCK = 'https://api.convertkit.com/v3';
export const CONVERT_KIT_API_KEY_MOCK = 'api-key';
export const CONVERT_KIT_API_FORM_ID_MOCK = 1;

window.ENV = {
  CONVERT_KIT_API_URL: CONVERT_KIT_API_URL_MOCK,
  CONVERT_KIT_API_KEY: CONVERT_KIT_API_KEY_MOCK,
  CONVERT_KIT_API_FORM_ID: CONVERT_KIT_API_FORM_ID_MOCK,
};

installGlobals();
