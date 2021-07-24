import { useEffect } from 'react';
import useSWR, { trigger } from 'swr';

import fetcher from '../utils/fetcher';

export default function ViewCounter({ slug }) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.data?.count);

//   console.log('Data---', data)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
        
      });

    registerView();
    trigger(`/api/views/${slug}`)
  }, [slug]);

  return `${views > 0 ? views.toLocaleString() : '–––'}`;
}