
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import CachedItemRow, { CachedItem } from './CachedItemRow';

interface CachedItemsTableProps {
  items: CachedItem[];
  onSyncItem: (item: CachedItem) => void;
  onRemoveItem: (id: string) => void;
  formatTimestamp: (timestamp: number) => string;
}

const CachedItemsTable: React.FC<CachedItemsTableProps> = ({
  items,
  onSyncItem,
  onRemoveItem,
  formatTimestamp
}) => {
  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>No cached data.</p>
        <p className="text-sm mt-1">All your changes have been synchronized.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <CachedItemRow
              key={item.id}
              item={item}
              onSync={onSyncItem}
              onRemove={onRemoveItem}
              formatTimestamp={formatTimestamp}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default CachedItemsTable;
