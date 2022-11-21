import {
  useCallback, useRef, useState, createRef, useEffect,
} from 'react';

export default function useAnimatesList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems(
      (prevState) => prevState.filter((item) => item.id !== itemId),
    );
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => id !== itemId),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animtedElement = animatedRef?.current;
      const alreadyHasListeners = animationEndListeners.current.has(itemId);

      if (animtedElement && !alreadyHasListeners) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animtedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animtedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListerners = animationEndListeners.current;
    return () => {
      removeListerners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [getAnimatedRef, items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
