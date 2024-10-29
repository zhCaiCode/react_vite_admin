import React from "react";
import { Navigate } from "react-router-dom";

export const lazy = (componentPath: string) =>
  React.lazy(() => import(`@/views/${componentPath}`));
export const Redirect = Navigate;
