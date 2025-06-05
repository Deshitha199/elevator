const ActionButton = ({ icon, label, isEmergency = false }) => {
  const getIcon = () => {
    switch (icon) {
      case 'bell':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${isEmergency
      ? 'bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
      : 'bg-gray-700 hover:bg-gray-600'
      }`}>
      <span className={isEmergency ? 'text-amber-400' : ''}>
        {getIcon()}
      </span>
      <span className={isEmergency ? 'text-amber-400' : ''}>{label}</span>
    </button>
  );
};

export default ActionButton;