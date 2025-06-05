import React, { useState, useEffect, useCallback, useRef } from 'react';

const FLOORS = [0, 1, 2, 3, 4, 5];
const MOVE_DELAY = 1500;
const DOOR_DELAY = 3000;

function useElevatorLogic() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [direction, setDirection] = useState('idle');
  const [isMoving, setIsMoving] = useState(false);
  const [doorState, setDoorState] = useState('closed');
  const [activeRequests, setActiveRequests] = useState({
    inside: [],
    outsideUp: [],
    outsideDown: []
  });
  const movementTimeout = useRef(null);  useEffect(() => {
    return () => {
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
    };
  }, []);

  const isButtonActive = (type, floor) => {
    return activeRequests[type].includes(floor);
  };

  const addRequest = useCallback((type, floor) => {
    if (!FLOORS.includes(floor)) return;

    setActiveRequests(prev => {
      if (prev[type].includes(floor)) return prev;

      return {
        ...prev,
        [type]: [...prev[type], floor]
      };
    });
  }, []);

  const findNextFloor = useCallback(() => {
    const { inside, outsideUp, outsideDown } = activeRequests;
    const allRequests = [...inside, ...outsideUp, ...outsideDown];
    const uniqueRequests = [...new Set(allRequests)];

    if (uniqueRequests.length === 0) return null;

    if (direction === 'up') {
      const floorsAbove = uniqueRequests.filter(f => f > currentFloor);
      if (floorsAbove.length > 0) return Math.min(...floorsAbove);

      const floorsBelow = uniqueRequests.filter(f => f < currentFloor);
      if (floorsBelow.length > 0) return Math.max(...floorsBelow);
      return null;
    }

    if (direction === 'down') {
      const floorsBelow = uniqueRequests.filter(f => f < currentFloor);
      if (floorsBelow.length > 0) return Math.max(...floorsBelow);

      const floorsAbove = uniqueRequests.filter(f => f > currentFloor);
      if (floorsAbove.length > 0) return Math.min(...floorsAbove);
      return null;
    }

    const distances = uniqueRequests.map(floor => ({
      floor,
      distance: Math.abs(floor - currentFloor)
    }));

    distances.sort((a, b) =>
      a.distance === b.distance
        ? a.floor - b.floor
        : a.distance - b.distance
    );

    return distances[0]?.floor ?? null;
  }, [activeRequests, currentFloor, direction]);
  const shouldServeCurrentFloor = useCallback(() => {
    const { inside, outsideUp, outsideDown } = activeRequests;

    if (inside.includes(currentFloor)) return true;

    if (direction === 'up' && outsideUp.includes(currentFloor)) return true;
    if (direction === 'down' && outsideDown.includes(currentFloor)) return true;

    const hasRequestsInDirection =
      direction === 'up'
        ? activeRequests.inside.some(f => f > currentFloor) ||
        activeRequests.outsideUp.some(f => f > currentFloor)
        : activeRequests.inside.some(f => f < currentFloor) ||
        activeRequests.outsideDown.some(f => f < currentFloor);

    if (!hasRequestsInDirection) {
      return outsideUp.includes(currentFloor) ||
        outsideDown.includes(currentFloor);
    }

    return false;
  }, [activeRequests, currentFloor, direction]);

  const removeServedRequests = useCallback(() => {
    setActiveRequests(prev => ({
      ...prev,
      inside: prev.inside.filter(f => f !== currentFloor),
      outsideUp: prev.outsideUp.filter(f => f !== currentFloor),
      outsideDown: prev.outsideDown.filter(f => f !== currentFloor)
    }));
  }, [currentFloor]);

  const handleDoorSequence = useCallback(() => {
    setDoorState('opening');

    setTimeout(() => {
      setDoorState('open');
      removeServedRequests();

      setTimeout(() => {
        setDoorState('closing');

        setTimeout(() => {
          setDoorState('closed');
        }, 1000);
      }, DOOR_DELAY);
    }, 1000);  }, [removeServedRequests]);

  useEffect(() => {
    if (doorState !== 'closed') return;

    if (shouldServeCurrentFloor()) {
      handleDoorSequence();
      return;
    }

    const nextFloor = findNextFloor();

    if (nextFloor === null) {
      setDirection('idle');
      setIsMoving(false);
      return;
    }

    const newDirection = nextFloor > currentFloor ? 'up' : 'down';
    setDirection(newDirection);
    setIsMoving(true);

    if (movementTimeout.current) {
      clearTimeout(movementTimeout.current);
    }

    movementTimeout.current = setTimeout(() => {
      setCurrentFloor(prev =>
        newDirection === 'up' ? prev + 1 : prev - 1
      );
    }, MOVE_DELAY);
  }, [
    doorState,
    currentFloor,
    activeRequests,
    direction,
    findNextFloor,
    shouldServeCurrentFloor,
    handleDoorSequence
  ]);

  return {
    currentFloor,
    direction,
    isMoving,
    doorState,
    activeRequests,
    isButtonActive,
    addRequest,
    FLOORS
  };
}

export default useElevatorLogic;