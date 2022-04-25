import { Button, Row, Table } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';

export default function EntryCategorymanager() {
  return (
    <>
      <Row justify={'space-between'}>
        <Button type={'primary'}>Atualizar categorias</Button>
        <Button type={'primary'}>Adicionar categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary> dataSource={[]} />
    </>
  );
}