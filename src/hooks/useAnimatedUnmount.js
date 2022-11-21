import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShoundRender] = useState(visible);

  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShoundRender(true);
    }

    function handleAnimationEnd() {
      setShoundRender(false);
    }

    const elementRef = animatedElementRef.current;
    if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
