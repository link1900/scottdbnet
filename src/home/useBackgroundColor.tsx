import { useEffect } from 'react';

export function useGreyBody() {
  useEffect(() => {
    document.body.style.backgroundColor = '#9e9e9e'

    return () => {
      document.body.style.backgroundColor = '#fff'
    }
  })
}
