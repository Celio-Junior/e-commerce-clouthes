import { useContext } from 'react';
import { ViewFormUserContext } from './config';

export function useContextViewFormUser() {
  return useContext(ViewFormUserContext);
}
