
import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, Upload, Check, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SyncStatus {
  lastSync: Date | null;
  pendingUploads: number;
  syncInProgress: boolean;
  errorCount: number;
}

interface OfflineSyncIndicatorProps {
  className?: string;
  onManualSync?: () => Promise<void>;
  syncStatus?: SyncStatus;
}

const OfflineSyncIndicator: React.FC<OfflineSyncIndicatorProps> = ({ 
  className,
  onManualSync,
  syncStatus: externalSyncStatus
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(externalSyncStatus || {
    lastSync: null,
    pendingUploads: 0,
    syncInProgress: false,
    errorCount: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "You're back online!",
        description: "Synchronizing your data...",
      });
      // Auto-sync when connection is restored
      if (onManualSync) {
        handleSync();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Changes will be saved locally and synced when connection is available.",
        variant: "destructive"
      });
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onManualSync, toast]);

  // Update sync status from props if provided
  useEffect(() => {
    if (externalSyncStatus) {
      setSyncStatus(externalSyncStatus);
    }
  }, [externalSyncStatus]);

  const handleSync = async () => {
    if (isOnline && onManualSync && !syncStatus.syncInProgress) {
      setSyncStatus(prev => ({ ...prev, syncInProgress: true }));
      
      try {
        await onManualSync();
        setSyncStatus(prev => ({ 
          ...prev, 
          lastSync: new Date(),
          pendingUploads: 0,
          syncInProgress: false 
        }));
        
        toast({
          title: "Sync Completed",
          description: "All your data has been synchronized successfully.",
        });
      } catch (error) {
        console.error("Sync error:", error);
        setSyncStatus(prev => ({ 
          ...prev, 
          syncInProgress: false,
          errorCount: prev.errorCount + 1
        }));
        
        toast({
          title: "Sync Failed",
          description: "There was an error synchronizing your data. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return "Never";
    
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant={
                !isOnline ? "destructive" : 
                syncStatus.pendingUploads > 0 ? "outline" : 
                "default"
              }
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1.5 py-0.5">
                {!isOnline ? (
                  <WifiOff className="h-3.5 w-3.5" />
                ) : syncStatus.pendingUploads > 0 ? (
                  <Upload className="h-3.5 w-3.5" />
                ) : (
                  <Wifi className="h-3.5 w-3.5" />
                )}
                
                <span>
                  {!isOnline ? "Offline" : 
                   syncStatus.pendingUploads > 0 ? `${syncStatus.pendingUploads} pending` : 
                   "Online"}
                </span>
                
                {syncStatus.errorCount > 0 && (
                  <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                )}
              </div>
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              {!isOnline 
                ? "You're currently offline. Changes will be saved locally." 
                : syncStatus.pendingUploads > 0 
                  ? `${syncStatus.pendingUploads} changes are waiting to be synchronized.` 
                  : "You're online and all data is synchronized."}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Last sync: {formatLastSync(syncStatus.lastSync)}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {onManualSync && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSync}
          disabled={!isOnline || syncStatus.syncInProgress || syncStatus.pendingUploads === 0}
          className="h-7 px-2"
        >
          {syncStatus.syncInProgress ? (
            <span className="flex items-center gap-1">
              <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full"></span>
              Syncing
            </span>
          ) : (
            <span className="flex items-center gap-1">
              {syncStatus.pendingUploads > 0 ? <Upload className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
              Sync
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default OfflineSyncIndicator;
