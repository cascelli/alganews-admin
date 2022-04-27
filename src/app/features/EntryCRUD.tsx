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
import {
  Button,
  Divider,
  Modal,
  notification,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import {
  InfoCircleFilled,
  TagOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import EntriesList from '../features/EntriesList';
import useCashFlow from '../../core/hooks/useCashFlow';
import DoubleConfirm from '../components/DoubleConfirm';
import { useCallback, useState } from 'react';
import EntryCategoryManager from '../features/EntryCategoryManager';
import EntryForm from '../features/EntryForm';
import EntryDetails from '../features/EntryDetails';
import moment from 'moment';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Title, Text } = Typography;

interface EntryCRUDProps {
  type: 'EXPENSE' | 'REVENUE';
}

export default function EntryCRUD({ type }: EntryCRUDProps) {
  const { selected, removeEntries, query } = useCashFlow(type);
  const { xs } = useBreakpoint();

  const [editingEntry, setEditingEntry] = useState<number | undefined>(
    undefined
  );

  const [detailedEntry, setDetailedEntry] = useState<number | undefined>(
    undefined
  );

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const openCategoryModal = useCallback(() => setShowCategoryModal(true), []);
  const closeCategoryModal = useCallback(() => setShowCategoryModal(false), []);

  const openFormModal = useCallback(() => setShowFormModal(true), []);
  const closeFormModal = useCallback(() => setShowFormModal(false), []);

  const openDetailsModal = useCallback(() => setShowDetailsModal(true), []);
  const closeDetailsModal = useCallback(() => setShowDetailsModal(false), []);

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
        <EntryCategoryManager type={type} />
      </Modal>

      <Modal
        title={type === 'EXPENSE' ? 'Cadastrar despesa' : 'Cadastrar receita'}
        visible={showFormModal}
        onCancel={() => {
          closeFormModal();
          setEditingEntry(undefined);
        }}
        footer={null}
        destroyOnClose
      >
        <EntryForm
          type={type}
          editingEntry={editingEntry}
          onSuccess={() => {
            closeFormModal();
            notification.success({
              message: 'Entrada cadastrada com sucesso !',
            });
          }}
        />
      </Modal>

      <Modal
        title={
          type === 'EXPENSE' ? 'Detalhes da despesa' : 'Detalhes da receita'
        }
        visible={showDetailsModal}
        onCancel={() => {
          closeDetailsModal();
          // setEditingEntry(undefined);
        }}
        footer={null}
        destroyOnClose
      >
        {detailedEntry && <EntryDetails entryId={detailedEntry} />}
      </Modal>

      <Row
        justify={'space-between'}
        style={{
          marginBottom: 16,
          flexDirection: xs ? 'column-reverse' : 'row',
        }}
      >
        <Space style={{ ...(xs && { marginTop: 16 }) }}>
          <DoubleConfirm
            popConfirmTitle={`Remover ${
              selected.length > 1
                ? type === 'EXPENSE'
                  ? 'despesas selecionadas?'
                  : 'receitas selecionadas?'
                : type === 'EXPENSE'
                ? 'despesa selecionada?'
                : 'receita selecionada?'
            }`}
            modalTitle={
              type === 'EXPENSE' ? 'Remover despesas' : 'Remover receitas'
            }
            modalContent={
              type === 'EXPENSE'
                ? 'Remover uma ou mais despesas pode gerar impacto negativo no gráfico de receitas e despesas da empresa. Esta é uma ação irreversível.'
                : 'Remover uma ou mais receitas pode gerar impacto negativo no gráfico de receitas e despesas da empresa. Esta é uma ação irreversível.'
            }
            onConfirm={async () => {
              await removeEntries(selected as number[]);
            }}
            disabled={!selected.length}
          >
            <Button danger={xs} type={'primary'} disabled={!selected.length}>
              Remover
            </Button>
          </DoubleConfirm>
        </Space>

        <Space>
          <Button
            type={'primary'}
            icon={<TagOutlined />}
            onClick={openCategoryModal}
          >
            Categorias
          </Button>

          <Button
            type={'primary'}
            icon={<PlusCircleOutlined />}
            onClick={openFormModal}
          >
            Adicionar {type === 'EXPENSE' ? 'despesa' : 'receita'}
          </Button>
        </Space>
      </Row>
      <Space direction={'vertical'}>
        <Title level={3}>
          Recuperando {type === 'EXPENSE' ? 'despesas' : 'receitas'} do mês de{' '}
          {moment(query.yearMonth).format('MMMM \\d\\e YYYY')}
        </Title>
        <Space>
          <Text>
            É possível filtrar {type === 'EXPENSE' ? 'despesas' : 'receitas'}{' '}
            por mês
          </Text>
          <Tooltip placement={'right'} title={'Use a coluna Data para filtrar'}>
            <InfoCircleFilled />
          </Tooltip>
        </Space>
      </Space>

      <Divider />

      <EntriesList
        type={type}
        onEdit={(id) => {
          setEditingEntry(id);
          openFormModal();
        }}
        onDetail={(id) => {
          setDetailedEntry(id);
          openDetailsModal();
        }}
      />
    </>
  );
}
