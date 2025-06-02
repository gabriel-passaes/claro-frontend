"use client";

import { store } from "@/stores";
import React from "react";
import { Provider } from "react-redux";

interface ReduxProviderWrapperProps {
  children: React.ReactNode;
}

export default function ReduxProviderWrapper({ children }: ReduxProviderWrapperProps) {
  return <Provider store={store}>{children}</Provider>;
}
