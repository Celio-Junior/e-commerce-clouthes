'use client';
import React, { useState } from 'react';
import { ViewFormUserContext } from './config';

export default function ViewFormUser({ children }: { children: React.ReactNode }) {
  const [signUser, setSignUser] = useState(false);
  const [isViewFormLogin, setIsViewFormLogin] = useState(true);
  return (
    <ViewFormUserContext.Provider
      value={[
        { viewForm: signUser, setSignUser },
        { isViewFormLogin, setIsViewFormLogin },
      ]}
    >
      {children}
    </ViewFormUserContext.Provider>
  );
}
