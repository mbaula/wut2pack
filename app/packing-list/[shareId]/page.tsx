'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import PackingListPage from '../page';
import { useSharedList } from '@/hooks/useSharedList';

export default function SharedListPage() {
  const params = useParams();
  const router = useRouter();
  const { setTripDetails, tripDetails, setPackingList } = useTripStore();
  const { list, loading, error } = useSharedList(params.shareId as string);
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
      setIsReady(true);
    }
  }, [list, setTripDetails, setPackingList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading list</div>;
  if (!list) return <div>List not found</div>;
  if (!isReady) return <div>Loading list details...</div>;

  return <PackingListPage isShared={true} shareId={params.shareId as string} />;
} 