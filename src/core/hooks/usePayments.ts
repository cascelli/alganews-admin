/* === Impelmentação sem Flux / Redux === 
import { Payment, PaymentService } from 'danielbonifacio-sdk';
import { useCallback, useState } from 'react';

export default function usePayments() {
  const [payments, setPayments] = useState<Payment.Paginated>();
  const [fetchingPayments, setFetchingPayments] = useState(false);
  const [approvingPaymentsBatch, setApprovingPaymentsBatch] = useState(false);

  const approvePaymentsBatch = useCallback(async (paymentIds: number[]) => {
    try {
      setApprovingPaymentsBatch(true);
      await PaymentService.approvePaymentsBatch(paymentIds);
    } finally {
      setApprovingPaymentsBatch(false);
    }
  }, []);

  const fetchPayments = useCallback(async (query: Payment.Query) => {
    try {
      setFetchingPayments(true);
      const payments = await PaymentService.getAllPayments(query);
      setPayments(payments);
    } finally {
      setFetchingPayments(false);
    }
  }, []);
 
  return {
    payments,
    fetchPayments,
    fetchingPayments,
    approvingPaymentsBatch,
    approvePaymentsBatch,
  };
}
*/

/* === Impelmentação com Flux / Redux === */
import { Payment } from 'danielbonifacio-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as PaymentActions from '../store/Payment.slice';

export default function usePayments() {
  const dispatch = useDispatch();

  const fetching = useSelector((s: RootState) => s.payment.fetching);
  const payments = useSelector((s: RootState) => s.payment.paginated);
  const query = useSelector((s: RootState) => s.payment.query);

  const approvePaymentsInBatch = useCallback(
    (ids: number[]) => dispatch(PaymentActions.approvePaymentsInBatch(ids)),
    [dispatch]
  );

  const fetchPayments = useCallback(
    () => dispatch(PaymentActions.getAllPayments()),
    [dispatch]
  );

  const setQuery = useCallback(
    (query: Payment.Query) => dispatch(PaymentActions.setQuery(query)),
    [dispatch]
  );

  return {
    payments,
    fetching,
    query,
    fetchPayments,
    approvePaymentsInBatch,
    setQuery,
  };
}
