/* === Impelmentação sem Flux / Redux === 
import { Button, Divider, Row, Space, Tooltip, Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import EntriesList from '../features/EntriesList';
import useCashFlow from '../../core/hooks/useCashFlow';
import DoubleConfirm from '../components/DoubleConfirm';

const { Title, Text } = Typography;

export default function CashFlowExpensesView() {
  const { selected, setSelected, deleteEntriesInBatch } =
    useCashFlow('EXPENSE');

  return (
    <>
      <Row>
        <DoubleConfirm
          popConfirmTitle={`Remover ${
            selected.length > 1
              ? 'entradas selecionadas ?'
              : 'entrada selecionada ?'
          }`}
          modalTitle={'Remover entradas'}
          modalContent={
            'Remover uma ou mais entradas pode gerar impacto negativo no gráfico de recitas e despesas da empresa. Esta é uma ação irreversível.'
          }
          onConfirm={async () => {
            await deleteEntriesInBatch(selected as number[]);
          }}
        >
          <Button type={'primary'} disabled={!selected.length}>
            Remover
          </Button>
        </DoubleConfirm>
      </Row>
      <Space direction={'vertical'}>
        <Title level={3}>Recuperando entradas do mês de agosto</Title>
        <Space>
          <Text>É possíve filtrar lançamentos por mês</Text>

          <Tooltip placement={'right'} title={'Use a coluna Data para filtrar'}>
            <InfoCircleFilled />
          </Tooltip>
        </Space>
      </Space>
      <Divider />
      <EntriesList selected={selected} onSelect={setSelected} />
    </>
  );
}
*/

/* === Impelmentação com Flux / Redux === */
import { Button, Divider, Modal, Row, Space, Tooltip, Typography } from 'antd';
import { InfoCircleFilled, TagOutlined } from '@ant-design/icons';
import EntriesList from '../features/EntriesList';
import useCashFlow from '../../core/hooks/useCashFlow';
import DoubleConfirm from '../components/DoubleConfirm';
import { useCallback, useState } from 'react';
import EntryCategoryManager from '../features/EntryCategoryManager';

const { Title, Text } = Typography;

export default function CashFlowExpensesView() {
  const { selected, removeEntries } = useCashFlow('EXPENSE');

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const openCategoryModal = useCallback(() => setShowCategoryModal(true), []);
  const closeCategoryModal = useCallback(() => setShowCategoryModal(false), []);

  return (
    <>
      <Modal
        title={'Gerenciar Categoria'}
        visible={showCategoryModal}
        onCancel={closeCategoryModal}
        //closeIcon={<></>}
        //footer={<></>}
        footer={null}
        destroyOnClose
      >
        <EntryCategoryManager type={'EXPENSE'} />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <DoubleConfirm
          popConfirmTitle={`Remover ${
            selected.length > 1
              ? 'entradas selecionadas?'
              : 'entrada selecionada?'
          }`}
          modalTitle={'Remover entradas'}
          modalContent={
            'Remover uma ou mais entradas pode gerar impacto negativo no gráfico de receitas e despesas da empresa. Esta é uma ação irreversível.'
          }
          onConfirm={async () => {
            await removeEntries(selected as number[]);
          }}
        >
          <Button type={'primary'} disabled={!selected.length}>
            Remover
          </Button>
        </DoubleConfirm>
        <Button
          type={'primary'}
          icon={<TagOutlined />}
          onClick={openCategoryModal}
        >
          Categorias
        </Button>
      </Row>
      <Space direction={'vertical'}>
        <Title level={3}>Recuperando entradas do mês de agosto</Title>
        <Space>
          <Text>É possível filtrar lançamentos por mês</Text>
          <Tooltip placement={'right'} title={'Use a coluna Data para filtrar'}>
            <InfoCircleFilled />
          </Tooltip>
        </Space>
      </Space>

      <Divider />

      <EntriesList />
    </>
  );
}
