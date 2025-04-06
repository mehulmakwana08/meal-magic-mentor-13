
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload } from 'lucide-react';
import CachedItemsTable from './CachedItemsTable';
import { CachedItem } from './CachedItemRow';

interface DataEntryCacheProps {
  items?: CachedItem[];
  onSync?: (item: CachedItem) => Promise<void>;
  onSyncAll?: () => Promise<void>;
  onRemove?: (id: string) => void;
  onClear?: () => void;
  className?: string;
}

const DataEntryCache: React.FC<DataEntryCacheProps> = ({
  items = [],
  onSync,
  onSyncAll,
  onRemove,
  onClear,
  className
}) => {
  const [cachedItems, setCachedItems] = useState<CachedItem[]>(items);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCachedItems(items);
  }, [items]);

  const handleSyncItem = async (item: CachedItem) => {
    if (!onSync || item.syncStatus === 'syncing') return;
    
    try {
      setCachedItems(prev => 
        prev.map(i => i.id === item.id ? { ...i, syncStatus: 'syncing' } : i)
      );
      
      await onSync(item);
      
      setCachedItems(prev => 
        prev.map(i => i.id === item.id ? { ...i, syncStatus: 'synced' } : i)
      );
      
      toast({
        title: "Item Synchronized",
        description: `Successfully synchronized ${item.type}.`,
      });
    } catch (error) {
      console.error("Error syncing item:", error);
      
      setCachedItems(prev => 
        prev.map(i => i.id === item.id ? { 
          ...i, 
          syncStatus: 'error',
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        } : i)
      );
      
      toast({
        title: "Sync Failed",
        description: `Failed to synchronize ${item.type}. Will try again later.`,
        variant: "destructive"
      });
    }
  };

  const handleSyncAll = async () => {
    if (!onSyncAll || isSyncing) return;
    
    setIsSyncing(true);
    try {
      await onSyncAll();
      toast({
        title: "Sync Complete",
        description: "All cached data has been synchronized.",
      });
    } catch (error) {
      console.error("Error syncing all items:", error);
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize some items. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (!onRemove) return;
    
    onRemove(id);
    setCachedItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The cached item has been removed.",
    });
  };

  const handleClearAll = () => {
    if (!onClear) return;
    
    onClear();
    setCachedItems([]);
    toast({
      title: "Cache Cleared",
      description: "All cached data has been cleared.",
    });
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const pendingCount = cachedItems.filter(item => 
    item.syncStatus === 'pending' || item.syncStatus === 'error'
  ).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Offline Data Cache</CardTitle>
          {pendingCount > 0 && (
            <Badge variant="outline">
              {pendingCount} pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <CachedItemsTable
          items={cachedItems}
          onSyncItem={handleSyncItem}
          onRemoveItem={handleRemoveItem}
          formatTimestamp={formatTimestamp}
        />
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        {onSyncAll && (
          <Button
            variant="default"
            onClick={handleSyncAll}
            disabled={isSyncing || pendingCount === 0 || !navigator.onLine}
            className="mr-2"
          >
            {isSyncing ? (
              <>
                <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full"></span>
                Syncing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Sync All
              </>
            )}
          </Button>
        )}
        {onClear && (
          <Button
            variant="outline"
            onClick={handleClearAll}
            disabled={cachedItems.length === 0 || isSyncing}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cache
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DataEntryCache;
