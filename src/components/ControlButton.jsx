const ControlButton = ({ label, subtitle, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative group p-4 rounded-xl border-2 transition-all duration-300 ${isActive
          ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
          : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
        }`}
    >
      <div className="text-center">
        <div className={`text-2xl font-bold mb-1 ${isActive ? 'text-cyan-400' : 'text-gray-200'
          }`}>
          {label}
        </div>
        <div className={`text-xs ${isActive ? 'text-cyan-300' : 'text-gray-400'
          }`}>
          {subtitle}
        </div>
      </div>

      {isActive && (
        <div className="absolute inset-0 bg-cyan-500/10 rounded-xl animate-pulse" />
      )}
    </button>
  );
};
export default ControlButton;