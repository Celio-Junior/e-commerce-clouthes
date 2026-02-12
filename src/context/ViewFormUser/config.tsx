'use client';
import { createContext, Dispatch, SetStateAction } from 'react';

type ValueViewFormUserContextType = {
  viewForm: boolean;
  setSignUser: Dispatch<SetStateAction<boolean>>;
};
type ValueFormLoginUserContextType = {
  isViewFormLogin: boolean;
  setIsViewFormLogin: Dispatch<SetStateAction<boolean>>;
};

export const valueFormUserContext: [ValueViewFormUserContextType, ValueFormLoginUserContextType] = [
  {
    viewForm: false,
    setSignUser: () => {},
  },
  {
    isViewFormLogin: true,
    setIsViewFormLogin: () => {},
  },
];

export const ViewFormUserContext = createContext<typeof valueFormUserContext>(valueFormUserContext);
