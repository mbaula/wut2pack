import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SavedList } from '@/store/savedListsStore';

export function useSharedList(shareId: string) {
  const [list, setList] = useState<SavedList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchList() {
      try {
        const { data, error } = await supabase
          .from('lists')
          .select('*')
          .eq('share_id', shareId)
          .single();

        if (error) throw error;
        
        setList({
          id: data.id,
          name: data.name,
          origin: data.origin,
          destination: data.destination,
          startDate: data.start_date?.split('T')[0],
          endDate: data.end_date?.split('T')[0],
          items: data.items,
          createdAt: data.created_at,
          shareId: data.share_id,
          isShared: data.is_shared,
          user_id: data.user_id
        });
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchList();
  }, [shareId]);

  return { list, loading, error };
} 