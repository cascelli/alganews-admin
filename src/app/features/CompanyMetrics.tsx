import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'danielbonifacio-sdk';
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

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData);
  }, []);

  const config: AreaConfig = {
    data,
    height: 400,
    color: ['#0099ff', '#274960'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend) {
          return legend === 'totalRevenues'
            ? 'Receitas'
            : 'Despesas';
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
