import { Key } from 'antd/lib/table/interface';
import { CashFlow, CashFlowService } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useCallback, useState } from 'react';

type CashFlowEntryType = CashFlow.EntrySummary['type'];

export default function useCashFlow(type: CashFlowEntryType) {
  const [entries, setEntries] = useState<CashFlow.EntrySummary[]>([]);
  const [selected, setSelected] = useState<Key[]>([]);
  const [query, setQuery] = useState<CashFlow.Query>({
    type,
    sort: ['transactedOn', 'desc'],
    yearMonth: moment().format('YYYY-MM'),
  });

  const [fetchingEntries, setFetchingEntries] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      setFetchingEntries(true);
      const newEntries = await CashFlowService.getAllEntries(query);
      setEntries(newEntries);
    } finally {
      setFetchingEntries(false);
    }
  }, [query]);

  const deleteEntriesInBatch = useCallback(async (ids: number[]) => {
    try {
      setFetchingEntries(true);
      await CashFlowService.removeEntriesBatch(ids);
    } finally {
      setFetchingEntries(false);
    }
  }, []);
  return {
    entries,
    fetchingEntries,
    query,
    selected,
    fetchEntries,
    setQuery,
    setSelected,
    deleteEntriesInBatch,
  };
}
