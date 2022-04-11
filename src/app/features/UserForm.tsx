import {
  Avatar,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from 'antd';

export default function UserForm() {
  return (
    <Form layout={'vertical'}>
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          <Avatar size={128} />
        </Col>
        <Col lg={10}>
          <Form.Item label={'Nome'}>
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item label={'Data de nascimento'}>
            <DatePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
              allowClear={true}
            />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item label={'Bio'}>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item label={'Perfil'}>
            <Select placeholder={'Selecione um perfil'}>
              <Select.Option value={'Editor'}>
                Editor
              </Select.Option>
              <Select.Option value={'Assistant'}>
                Assistente
              </Select.Option>
              <Select.Option value={'Manager'}>
                Gerente
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item label={'Email'}>
            <Input
              type='email'
              placeholder={'E.g.: contato@joao.silva'}
            ></Input>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
