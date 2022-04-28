import { Area, AreaConfig } from '@ant-design/charts';
import { Card, Space, Typography } from 'antd';
import { LockFilled } from '@ant-design/icons';
import { MetricService } from 'danielbonifacio-sdk';
import { ForbiddenError } from 'danielbonifacio-sdk/dist/errors';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useEffect, useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDtataIntoAntdChart';

export default function CompanyMetrics() {
  /*
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  */
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData)
      .catch((err) => {
        if (err instanceof ForbiddenError) {
          setForbidden(true);
          return; // Comentar se quiser mostrar mensagem de erro exibida em janela de pop-up
        }

        throw err;
      });
  }, []);

  if (forbidden)
    return (
      <Card style={{ minHeight: 256, display: 'flex', alignItems: 'center' }}>
        <Space direction={'vertical'}>
          <Space align={'center'}>
            <LockFilled style={{ fontSize: 32 }} />
            <Typography.Title style={{ margin: 0 }}>
              Acesso negado
            </Typography.Title>
          </Space>
          <Typography.Paragraph>
            Você não tem permissão para visualizar estes dados
          </Typography.Paragraph>
        </Space>
      </Card>
    );

  const config: AreaConfig = {
    data,
    height: 256,
    color: ['#0099ff', '#274960'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend) {
          return legend === 'totalRevenues' ? 'Receitas' : 'Despesas';
        },
      },
    },
    tooltip: {
      title(title) {
        return format(new Date(title), 'MMMM yyyy', {
          locale: ptBR,
        });
      },
      formatter(data) {
        return {
          name: data.category === 'totalRevenues' ? 'Receitas' : 'Despesas',
          value: (data.value as number).toLocaleString('pr-BR', {
            currency: 'BRL',
            style: 'currency',
            maximumFractionDigits: 2,
          }),
        };
      },
    },
    yAxis: {}, // Desabilitar : yAxis: false
    xAxis: {
      label: {
        formatter(item) {
          return format(new Date(item), 'MM/yyyy');
        },
      },
    },
    point: {
      size: 5,
      shape: 'circle',
    },
  };
  return <Area {...config} />;
}
