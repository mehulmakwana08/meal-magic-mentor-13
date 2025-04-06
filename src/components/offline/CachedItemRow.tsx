
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Upload } from 'lucide-react';
import SyncStatusIcon from './SyncStatusIcon';

export interface CachedItem {
  id: string;
  type: string;
  timestamp: number;
  data: any;
  syncStatus: 'pending' | 'syncing' | 'error' | 'synced';
  errorMessage?: string;
}

interface CachedItemRowProps {
  item: CachedItem;
  onSync: (item: CachedItem) => void;
  onRemove: (id: string) => void;
  formatTimestamp: (timestamp: number) => string;
}

const CachedItemRow: React.FC<CachedItemRowProps> = ({
  item,
  onSync,
  onRemove,
  formatTimestamp
}) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.type}</TableCell>
      <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <SyncStatusIcon status={item.syncStatus} />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-1">
          {(item.syncStatus === 'pending' || item.syncStatus === 'error') && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onSync(item)}
              disabled={!navigator.onLine}
              className="h-8 w-8"
            >
              <Upload className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(item.id)}
            disabled={item.syncStatus === 'syncing'}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CachedItemRow;
