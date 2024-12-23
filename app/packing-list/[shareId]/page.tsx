'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import PackingListPage from '../page';
import { useSharedList } from '@/hooks/useSharedList';
import { supabase } from '@/lib/supabase';
import { SavedList } from '@/store/savedListsStore';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function SharedListPage({ params, searchParams }: PageProps) {
  const routeParams = useParams();
  const shareId = routeParams.shareId as string;
  const router = useRouter();
  const { setTripDetails, setPackingList } = useTripStore();
  const { list, loading, error } = useSharedList(shareId);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (list) {
      setTripDetails({
        origin: list.origin,
        destination: list.destination,
        startDate: list.startDate,
        endDate: list.endDate,
        listName: list.name,
      });
      setPackingList(list.items);
      
      // Add list ID to accessible lists in localStorage
      const accessibleLists = JSON.parse(localStorage.getItem('accessibleLists') || '[]');
      if (!accessibleLists.includes(list.id)) {
        accessibleLists.push(list.id);
        localStorage.setItem('accessibleLists', JSON.stringify(accessibleLists));
      }
      
      setIsReady(true);
    }
  }, [list, setTripDetails, setPackingList]);

  if (loading) return <div>Loading...</div>;
  if (error || !list) return <div>List not found</div>;
  if (!isReady) return <div>Loading list details...</div>;

  return <PackingListPage 
    isShared={true} 
    shareId={shareId as string} 
    params={params}
    searchParams={searchParams}
  />;
} 