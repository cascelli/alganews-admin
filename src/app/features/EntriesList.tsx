import { Button, Space, Table, Tag } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useEffect } from 'react';
import useCashFlow from '../../core/hooks/useCashFlow';
import transformIntoBrl from '../../core/utils/transformIntoBrl';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

export default function EntriesList() {
  const { entries, fetchingEntries, fetchEntries } = useCashFlow();

  useEffect(() => {
    fetchEntries({
      type: 'EXPENSE',
      sort: ['transactedOn', 'desc'],
      yearMonth: moment().format('YYYY-MM'),
    });
  }, [fetchEntries]);
  return (
    <Table<CashFlow.EntrySummary>
      dataSource={entries}
      columns={[
        {
          dataIndex: 'description',
          title: 'Descrição',
          width: 300,
          ellipsis: true,
        },

        {
          dataIndex: 'category',
          title: 'Categoria',
          align: 'center',
          render(category: CashFlow.EntrySummary['category']) {
            return <Tag>{category.name}</Tag>;
          },
        },

        {
          dataIndex: 'transactedOn',
          title: 'Data',
          align: 'center',
          render(transactedOn: CashFlow.EntrySummary['transactedOn']) {
            return moment(transactedOn).format('DD/MM/YYYY');
          },
        },

        {
          dataIndex: 'amount',
          title: 'Valor',
          align: 'right',
          //   render(amount: CashFlow.EntrySummary['amount']) {
          //     return transformIntoBrl(amount);
          //   },
          render: transformIntoBrl, // Equivalente ao bloco anterior
        },

        {
          dataIndex: 'id',
          title: 'Ações',
          align: 'center',
          render(id: number) {
            return (
              <Space>
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<DeleteOutlined />}
                  danger
                />
                <Button type={'text'} size={'small'} icon={<EditOutlined />} />
                <Button type={'text'} size={'small'} icon={<EyeOutlined />} />
              </Space>
            );
          },
        },
      ]}
    />
  );
}
