'use client';

import { AdminSearch } from '@/components/admin/common/admin-search';
import { useDebouncedValue } from '@/lib/admin/list-utils';
import { useEffect, useState } from 'react';

type OrderSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OrderSearch({ value, onChange }: OrderSearchProps) {
  const [local, setLocal] = useState(value);
  const debounced = useDebouncedValue(local, 300);

  useEffect(() => {
    onChange(debounced);
    // Parent handlers are often inline; debounce value is the intentional dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <AdminSearch
      value={local}
      onChange={setLocal}
      label="Search orders"
      placeholder="Order ID, email, service, username…"
    />
  );
}
