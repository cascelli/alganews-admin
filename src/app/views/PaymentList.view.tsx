import {
  Button,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { Payment } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useEffect } from 'react';
import {
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import usePAyments from '../../core/hooks/usePayments';
import confirm from 'antd/lib/modal/confirm';

export default function PaymentListView() {
  const { payments, fetchPayments } = usePAyments();

  useEffect(() => {
    fetchPayments({
      sort: ['scheduledTo', 'desc'],
      page: 0,
    });
  }, [fetchPayments]);
  return (
    <>
      <Table<Payment.Summary>
        dataSource={payments?.content}
        rowKey='id'
        columns={[
          {
            dataIndex: 'id',
            title: '#',
          },
          {
            dataIndex: 'payee',
            title: 'Editor',
            render(payee: Payment.Summary['payee']) {
              return payee.name;
            },
          },
          {
            dataIndex: 'scheduledTo',
            title: 'Agendamento',
            align: 'center',
            render(date: string) {
              return moment(date).format('DD/Mm/YYYY');
            },
          },
          {
            dataIndex: 'accountingPeriod',
            title: 'Período',
            align: 'center',
            render(
              period: Payment.Summary['accountingPeriod']
            ) {
              const starts = moment(period.startsOn).format(
                'DD/Mm/YYYY'
              );
              const ends = moment(period.endsOn).format(
                'DD/Mm/YYYY'
              );
              return `${starts} - ${ends}`;
            },
          },

          {
            dataIndex: 'approvedAt',
            title: 'Status',
            align: 'center',
            render(
              approvalDate: Payment.Summary['approvedAt']
            ) {
              const formattedApprovalDate =
                moment(approvalDate).format('DD/Mm/YYYY');

              return (
                <Tag
                  color={approvalDate ? 'green' : 'warning'}
                >
                  {approvalDate
                    ? `Aprovado em ${formattedApprovalDate}`
                    : 'Aguardando aprovação'}
                </Tag>
              );
            },
          },

          {
            dataIndex: 'id',
            title: 'Ações',
            render(id: number, payment) {
              return (
                <>
                  <Tooltip
                    title={'Detalhar'}
                    placement={'left'}
                  >
                    <Button
                      size='small'
                      icon={<EyeOutlined />}
                    />
                  </Tooltip>

                  <Popconfirm
                    title={'Remover agendamento ?'}
                    onConfirm={() => {
                      confirm({
                        title: 'Remover agendamento',
                        onOk() {
                          console.log(
                            'todo: implement payment deletion'
                          );
                        },
                        content:
                          'Esta é uma ação irreversível. Ao remover o agendamento, ele não poderá ser recuperado !',
                      });
                    }}
                  >
                    <Tooltip
                      title={
                        payment.canBeDeleted
                          ? 'Remover'
                          : 'Pagamento já aprovado'
                      }
                      placement={'left'}
                    >
                      <Button
                        size='small'
                        icon={<DeleteOutlined />}
                        disabled={!payment.canBeDeleted}
                      />
                    </Tooltip>
                  </Popconfirm>
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
