import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-[#14241E] px-3.5 py-2 text-xs font-medium text-white shadow-md"
    >
      <WifiOff className="h-3.5 w-3.5 text-[#A7D7C5]" aria-hidden="true" />
      <span>Offline Mode — DiSC® Team App remains available from cache.</span>
    </div>
  );
};
