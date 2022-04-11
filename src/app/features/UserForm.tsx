import {
  Avatar,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tabs,
} from 'antd';

import React from 'react';

const { TabPane } = Tabs;

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
        <Col lg={24}>
          <Divider />
        </Col>
        <Col lg={24}>
          <Tabs defaultActiveKey={'personal'} type='card'>
            <TabPane
              key={'personal'}
              tab={'Dados pessoais'}
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item label={'País'}>
                    <Input placeholder={'E.g: Brasil'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Estado'}>
                    <Input
                      placeholder={'E.g: Espírito Santo'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Cidade'}>
                    <Input
                      placeholder={'E.g: Vila Velha'}
                    />
                  </Form.Item>
                </Col>

                <Col lg={8}>
                  <Form.Item label={'Telefone'}>
                    <Input
                      placeholder={'(27) 99999-0000'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'CPF'}>
                    <Input placeholder={'111.222.333-44'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Preço por palavra'}>
                    <Input placeholder={'0'} />
                  </Form.Item>
                </Col>
                {/* alternativa a linha abaixo para uso com muitos elementos repetidos
                {Array(3).fill(null).map((_, index) => } */}
                {[1, 2, 3].map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Col lg={6}>
                        <Form.Item label={'Habilidade'}>
                          <Input
                            placeholder={'E.g.: Javascript'}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={2}>
                        <Form.Item label={'%'}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </TabPane>
            <TabPane
              key={'bankAccount'}
              tab={'Dados bancários'}
            >
              Dados bancários
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Form>
  );
}
