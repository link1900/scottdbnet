import React from "react";
import { ErrorCard } from "./ErrorCard";
import { LoadingCard } from "./LoadingCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

export interface Props {
  error?: Error | unknown;
  errorType?: "hidden" | "errorCard" | "errorMessage";
  loading?: boolean;
  loadingMessage?: string;
  loadingType?: "hidden" | "spinnerCard" | "spinner";
  children?: React.ReactNode;
  minHeight?: number;
  minWidth?: number;
}

export function DataZone(props: Props) {
  const {
    error,
    errorType = "errorMessage",
    loading = false,
    loadingMessage,
    loadingType = "spinner",
    children,
    minHeight,
    minWidth
  } = props;
  if (error && error instanceof Error) {
    switch (errorType) {
      case "errorCard":
        return <ErrorCard message={error.message} />;
      case "errorMessage":
        return <ErrorMessage message={error.message} />;
      case "hidden":
        return null;
    }
  }

  if (loading) {
    switch (loadingType) {
      case "spinnerCard":
        return (
          <LoadingCard
            minHeight={minHeight}
            minWidth={minWidth}
            message={loadingMessage}
          />
        );
      case "spinner":
        return (
          <LoadingSpinner
            minHeight={minHeight}
            minWidth={minWidth}
            message={loadingMessage}
          />
        );
      case "hidden":
        return null;
    }
  }

  if (children) {
    return <>{children}</>;
  }

  return null;
}
