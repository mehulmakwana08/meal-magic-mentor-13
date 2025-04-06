
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge'; // Added import for Badge component
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CachedItem {
  id: string;
  type: string;
  timestamp: number;
  data: any;
  syncStatus: 'pending' | 'syncing' | 'error' | 'synced';
  errorMessage?: string;
}

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
      // Update state to show syncing
      setCachedItems(prev => 
        prev.map(i => i.id === item.id ? { ...i, syncStatus: 'syncing' } : i)
      );
      
      await onSync(item);
      
      // Update state to show synced
      setCachedItems(prev => 
        prev.map(i => i.id === item.id ? { ...i, syncStatus: 'synced' } : i)
      );
      
      toast({
        title: "Item Synchronized",
        description: `Successfully synchronized ${item.type}.`,
      });
    } catch (error) {
      console.error("Error syncing item:", error);
      
      // Update state to show error
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

  const renderSyncStatus = (status: CachedItem['syncStatus']) => {
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

  const pendingCount = cachedItems.filter(item => item.syncStatus === 'pending' || item.syncStatus === 'error').length;

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
        {cachedItems.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <p>No cached data.</p>
            <p className="text-sm mt-1">All your changes have been synchronized.</p>
          </div>
        ) : (
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
                {cachedItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {renderSyncStatus(item.syncStatus)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        {(item.syncStatus === 'pending' || item.syncStatus === 'error') && onSync && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleSyncItem(item)}
                            disabled={item.syncStatus === 'syncing' || !navigator.onLine}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        )}
                        {onRemove && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={item.syncStatus === 'syncing'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
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
