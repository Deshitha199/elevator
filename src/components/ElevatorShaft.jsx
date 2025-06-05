import React from 'react';
import Floor from './Floor';

const ElevatorShaft = ({
  currentFloor,
  direction,
  isMoving,
  addRequest,
  isButtonActive,
  FLOORS
}) => {
  const getElevatorPosition = () => {
    return currentFloor * 100;
  };

  const handleOutsideButtonClick = (floor, direction) => {
    if (direction === 'up') {
      addRequest('outsideUp', floor);
    } else {
      addRequest('outsideDown', floor);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-5 shadow-xl h-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
          </svg>
          Elevator Shaft
        </h2>
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-900/50 rounded-full">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isMoving ? 'bg-green-500 animate-pulse' :
                direction === 'idle' ? 'bg-gray-500' : 'bg-cyan-500'
              }`}></div>
            <span className="text-sm">
              {isMoving ? `Moving ${direction}` :
                direction === 'idle' ? 'Idle' : `Direction: ${direction}`}
            </span>
          </div>
          <div className="h-4 w-px bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Shaft Visualization */}
      <div className="bg-gray-900 rounded-xl p-4 h-[500px] relative overflow-hidden">
        {/* Elevator Car */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 w-48 h-24 bg-gradient-to-r from-cyan-700 to-blue-800 rounded-lg flex items-center justify-center shadow-lg border border-cyan-500/30 transition-all duration-[3500ms] ease-in-out ${isMoving ? 'opacity-90' : 'opacity-100'
            }`}
          style={{ bottom: `${getElevatorPosition()}px` }}
        >
          <div className="text-center z-10">
            <div className="text-2xl font-bold mb-1">
              {currentFloor === 0 ? 'G' : currentFloor}
            </div>
            <div className="text-sm text-cyan-300 flex items-center justify-center">
              {isMoving && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${direction === 'up' ? '' : 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Moving {direction}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floors */}
        {FLOORS.slice(0, 5).reverse().map((floorNumber) => {
          const position = floorNumber * 100;
          const isCurrentFloor = currentFloor === floorNumber;
          const hasUpButton = floorNumber < Math.max(...FLOORS.slice(0, 5));
          const hasDownButton = floorNumber > 0;

          return (
            <Floor
              key={floorNumber}
              number={floorNumber === 0 ? 'G' : floorNumber}
              position={`${position}px`}
              isActive={isCurrentFloor}
              hasUpButton={hasUpButton}
              hasDownButton={hasDownButton}
              isUpButtonActive={isButtonActive('outsideUp', floorNumber)}
              isDownButtonActive={isButtonActive('outsideDown', floorNumber)}
              onUpClick={() => handleOutsideButtonClick(floorNumber, 'up')}
              onDownClick={() => handleOutsideButtonClick(floorNumber, 'down')}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ElevatorShaft;