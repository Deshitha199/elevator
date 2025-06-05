
import React, { useState, useEffect, useCallback } from 'react';

const FLOORS = [0, 1, 2, 3, 4, 5];
const MOVE_DELAY = 1500;
const DOOR_DELAY = 3000;

function useElevatorLogic() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [direction, setDirection] = useState('idle');
  const [isMoving, setIsMoving] = useState(false);
  const [doorState, setDoorState] = useState('closed');  const [activeRequests, setActiveRequests] = useState({
    inside: [],
    outsideUp: [],
    outsideDown: []
  });

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
  
  const findNextFloor = useCallback(() => {    const { inside, outsideUp, outsideDown } = activeRequests;

    if (inside.length === 0 && outsideUp.length === 0 && outsideDown.length === 0) {
      return null;
    }

    const allRequests = [...inside, ...outsideUp, ...outsideDown];
    const uniqueRequests = [...new Set(allRequests)];

    let nextFloor = null;

    if (direction === 'up') {
      const floorsAbove = uniqueRequests.filter(f => f > currentFloor);
      const floorsBelow = uniqueRequests.filter(f => f < currentFloor);

      if (floorsAbove.length > 0) {
        nextFloor = Math.min(...floorsAbove);
      } else if (floorsBelow.length > 0) {
        nextFloor = Math.max(...floorsBelow);
      }
    }
    else if (direction === 'down') {
      const floorsBelow = uniqueRequests.filter(f => f < currentFloor);
      const floorsAbove = uniqueRequests.filter(f => f > currentFloor);

      if (floorsBelow.length > 0) {
        nextFloor = Math.max(...floorsBelow);
      } else if (floorsAbove.length > 0) {
        nextFloor = Math.min(...floorsAbove);
      }
    }
    else {
      if (uniqueRequests.length > 0) {
        const floorsAbove = uniqueRequests.filter(f => f > currentFloor);
        const floorsBelow = uniqueRequests.filter(f => f < currentFloor);

        if (floorsAbove.length > 0 && floorsBelow.length > 0) {
          const nearestAbove = Math.min(...floorsAbove);
          const nearestBelow = Math.max(...floorsBelow);

          if (Math.abs(nearestAbove - currentFloor) <= Math.abs(nearestBelow - currentFloor)) {
            nextFloor = nearestAbove;
          } else {
            nextFloor = nearestBelow;
          }
        } else if (floorsAbove.length > 0) {
          nextFloor = Math.min(...floorsAbove);
        } else if (floorsBelow.length > 0) {
          nextFloor = Math.max(...floorsBelow);
        }
      }
    }    return nextFloor;
  }, [activeRequests, currentFloor, direction]);

  const shouldServeCurrentFloor = useCallback(() => {
    const { inside, outsideUp, outsideDown } = activeRequests;

    if (inside.includes(currentFloor)) return true;

    if (direction === 'up' && outsideUp.includes(currentFloor)) return true;
    if (direction === 'down' && outsideDown.includes(currentFloor)) return true;

    const allRequests = [...inside, ...outsideUp, ...outsideDown];
    const hasMoreInDirection = direction === 'up'
      ? allRequests.some(f => f > currentFloor)
      : allRequests.some(f => f < currentFloor);

    if (!hasMoreInDirection) {
      return outsideUp.includes(currentFloor) || outsideDown.includes(currentFloor);
    }

    return false;
  }, [activeRequests, currentFloor, direction]);

  const removeServedRequests = useCallback(() => {    setActiveRequests(prev => {
      const newRequests = { ...prev };

      newRequests.inside = prev.inside.filter(f => f !== currentFloor);

      if (direction === 'up' || prev.outsideUp.includes(currentFloor)) {
        newRequests.outsideUp = prev.outsideUp.filter(f => f !== currentFloor);
      }

      if (direction === 'down' || prev.outsideDown.includes(currentFloor)) {
        newRequests.outsideDown = prev.outsideDown.filter(f => f !== currentFloor);
      }

      return newRequests;
    });
  }, [currentFloor, direction]);

  const [targetFloor, setTargetFloor] = useState(null);
  const [movementInProgress, setMovementInProgress] = useState(false);

  // Main elevator logic
  useEffect(() => {    if (doorState !== 'closed') return;

    if (shouldServeCurrentFloor()) {
      setDoorState('opening');
      setIsMoving(false);
      setMovementInProgress(false);
      setTargetFloor(null);

      setTimeout(() => {
        setDoorState('open');
        removeServedRequests();
        setTimeout(() => {
          setDoorState('closing');
          setTimeout(() => {
            setDoorState('closed');
          }, 1000);
        }, DOOR_DELAY);
      }, 1000);
      return;
    }

    const nextFloor = findNextFloor();

    if (nextFloor === null) {
      setDirection('idle');
      setIsMoving(false);
      setMovementInProgress(false);
      setTargetFloor(null);
      return;
    }

    if (movementInProgress && targetFloor !== null && nextFloor !== targetFloor) {
      console.log(`Route change: was going to ${targetFloor}, now going to ${nextFloor}`);
      setTargetFloor(nextFloor);
      const newDirection = nextFloor > currentFloor ? 'up' : 'down';
      setDirection(newDirection);
      return;
    }

    if (!movementInProgress) {      const newDirection = nextFloor > currentFloor ? 'up' : 'down';
      setDirection(newDirection);
      setTargetFloor(nextFloor);
      setIsMoving(true);
      setMovementInProgress(true);

      console.log(`Starting movement from ${currentFloor} to ${nextFloor} (${newDirection})`);

      const steps = Math.abs(nextFloor - currentFloor);

      const moveStep = (step = 1, position = currentFloor) => {
        if (step > steps || position === nextFloor) {
          setCurrentFloor(nextFloor);
          setIsMoving(false);
          setMovementInProgress(false);
          setTargetFloor(null);
          return;
        }

        setTimeout(() => {
          const nextPosition = newDirection === 'up' ? position + 1 : position - 1;
          setCurrentFloor(nextPosition);

          const currentOptimalNext = findNextFloor();
          if (currentOptimalNext !== null && currentOptimalNext !== nextFloor) {
            moveStep(step + 1, nextPosition);
          } else {
            moveStep(step + 1, nextPosition);
          }
        }, MOVE_DELAY);
      };

      moveStep();
    }

  }, [
    activeRequests,
    currentFloor,
    direction,
    doorState,
    targetFloor,
    movementInProgress,
    findNextFloor,
    shouldServeCurrentFloor,
    removeServedRequests
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