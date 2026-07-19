'use client';

import { useEffect, useState } from 'react';

import { AdminSearch } from '@/components/admin/common/admin-search';
import { useDebouncedValue } from '@/lib/admin/list-utils';

export type FAQSearchAdminProps = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Admin FAQ search — Document 14.04 architecture (no backend).
 */
export function FAQSearchAdmin({ value, onChange }: FAQSearchAdminProps) {
  const [local, setLocal] = useState(value);
  const debounced = useDebouncedValue(local);
  useEffect(() => onChange(debounced), [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminSearch
      value={local}
      onChange={setLocal}
      label="Search FAQs"
      placeholder="Question, answer, keyword, service…"
    />
  );
}
