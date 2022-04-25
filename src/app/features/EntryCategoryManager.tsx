import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import { useCallback, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';

export default function EntryCategoryManager(props: {
  type: 'EXPENSE' | 'REVENUE';
}) {
  const { expenses, fetchCategories, revenues } = useEntriesCategories();

  const [showCreationModal, setShowCreationModal] = useState(false);

  const openCreationModal = useCallback(() => setShowCreationModal(true), []);
  const closeCreationModal = useCallback(() => setShowCreationModal(false), []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Modal
        visible={showCreationModal}
        onCancel={closeCreationModal}
        title={'Adicionar Categoria'}
        footer={null}
      >
        <CategoryForm />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <Button>Atualizar categorias</Button>
        <Button onClick={openCreationModal}>Adicionar categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary>
        size={'small'}
        dataSource={props.type === 'EXPENSE' ? expenses : revenues}
        columns={[
          {
            dataIndex: 'name',
            title: 'Descrição',
          },
          {
            dataIndex: 'totalEntries',
            title: 'Vínculos',
            align: 'right',
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render(id: number) {
              return (
                <>
                  <Button
                    danger
                    type={'ghost'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}

function CategoryForm() {
  return (
    <Form layout={'vertical'}>
      <Row justify={'end'}>
        <Col xs={24}>
          <Form.Item
            label={'Categoria'}
            name={'name'}
            rules={[
              { required: true, message: 'O nome da categoria é obrigatório' },
            ]}
          >
            <Input placeholder={'E.g.: Infra'} />
          </Form.Item>
        </Col>
        <Button
          type={'primary'}
          htmlType={'submit'}
          icon={<CheckCircleOutlined />}
        >
          Cadastrar Categoria
        </Button>
      </Row>
    </Form>
  );
}
