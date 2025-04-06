
import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

type SyncStatus = 'pending' | 'syncing' | 'error' | 'synced';

interface SyncStatusIconProps {
  status: SyncStatus;
}

const SyncStatusIcon: React.FC<SyncStatusIconProps> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'syncing':
      return <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></span>;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    case 'synced':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

export default SyncStatusIcon;
