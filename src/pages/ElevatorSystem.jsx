import useElevatorLogic from '../hooks/useElevatorLogic';
import ElevatorShaft from '../components/ElevatorShaft';
import ElevatorControls from '../components/ElevatorControls';

const ElevatorSystem = () => {
  const {
    currentFloor,
    direction,
    isMoving,
    activeRequests,
    isButtonActive,
    addRequest,
    FLOORS
  } = useElevatorLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Elevator System
          </h1>
          <div className="mt-4 text-sm text-gray-400">
            Current Floor: {currentFloor === 0 ? 'Ground' : `Floor ${currentFloor}`} |
            Status: {isMoving ? `Moving ${direction}` : direction === 'idle' ? 'Idle' : `Ready to go ${direction}`}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Elevator Shaft Component */}
          <div className="lg:col-span-2">
            <ElevatorShaft
              currentFloor={currentFloor}
              direction={direction}
              isMoving={isMoving}
              addRequest={addRequest}
              isButtonActive={isButtonActive}
              FLOORS={FLOORS}
            />
          </div>

          <div className="flex flex-col gap-6">
            <ElevatorControls
              addRequest={addRequest}
              isButtonActive={isButtonActive}
              FLOORS={FLOORS}
            />

            {/* Active Requests Display */}
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Active Requests</h3>
              <div className="space-y-2">
                {activeRequests.inside.length > 0 && (
                  <div>
                    <span className="text-cyan-400 text-sm">Inside: </span>
                    {activeRequests.inside.map(floor => (
                      <span key={floor} className="inline-block bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded text-sm mr-2">
                        {floor === 0 ? 'G' : floor}
                      </span>
                    ))}
                  </div>
                )}
                {activeRequests.outsideUp.length > 0 && (
                  <div>
                    <span className="text-amber-400 text-sm">Outside Up: </span>
                    {activeRequests.outsideUp.map(floor => (
                      <span key={floor} className="inline-block bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-sm mr-2">
                        {floor === 0 ? 'G' : floor}
                      </span>
                    ))}
                  </div>
                )}
                {activeRequests.outsideDown.length > 0 && (
                  <div>
                    <span className="text-orange-400 text-sm">Outside Down: </span>
                    {activeRequests.outsideDown.map(floor => (
                      <span key={floor} className="inline-block bg-orange-900/30 text-orange-400 px-2 py-1 rounded text-sm mr-2">
                        {floor === 0 ? 'G' : floor}
                      </span>
                    ))}
                  </div>
                )}
                {activeRequests.inside.length === 0 && activeRequests.outsideUp.length === 0 && activeRequests.outsideDown.length === 0 && (
                  <div className="text-gray-500 text-sm">No active requests</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorSystem;