const Floor = ({
  number,
  position,
  isActive = false,
  hasUpButton = false,
  hasDownButton = false,
  isUpButtonActive = false,
  isDownButtonActive = false,
  onUpClick,
  onDownClick
}) => {
  return (
    <div
      className={`absolute left-0 right-0 h-24 flex items-center px-4 border-b border-gray-700 ${isActive ? 'bg-gray-800/30' : ''
        }`}
      style={{ bottom: position }}
    >
      <div className="font-mono text-lg font-bold w-8">
        {number}
      </div>
      <div className="ml-auto flex gap-2">
        {hasUpButton && (
          <button
            onClick={onUpClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isUpButtonActive
                ? 'bg-amber-500/20 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isUpButtonActive ? 'text-amber-400' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {hasDownButton && (
          <button
            onClick={onDownClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDownButtonActive
                ? 'bg-amber-500/20 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDownButtonActive ? 'text-amber-400' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Floor;