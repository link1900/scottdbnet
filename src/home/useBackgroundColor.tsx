import { useEffect } from "react";

export function useGreyBody() {
  useEffect(() => {
    document.body.style.backgroundColor = "#E1E2E1";

    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });
}
