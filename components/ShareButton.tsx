'use client'

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSavedListsStore } from '@/store/savedListsStore';

interface ShareButtonProps {
  shareId: string;
  listId?: string;
}

export function ShareButton({ shareId, listId }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const { updateList } = useSavedListsStore();

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareUrl = `${window.location.origin}/packing-list/${shareId}`;
      await navigator.clipboard.writeText(shareUrl);
      if (listId) {
        await updateList(listId, { isShared: true });
      }
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy share link');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition-colors"
    >
      {isSharing ? 'Copying...' : 'Share List'}
    </button>
  );
} 