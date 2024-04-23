/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skillTable } from "@/components/skill/skillTable";
import { yupSync } from "@/helpers/validation";
import {
  useCreatePosition,
  useDeletePosition,
  useGetPosition,
  useUpdatePosition,
} from "@/hooks/usePosition";
import ISkill, { ISkillCreate } from "@/interfaces/skill/skills.interface";
import { Button, Col, Form, Input, Modal, Row, Table, Typography, message } from "antd";
import { Rule } from "antd/es/form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import "../project/createProject.scss";

interface CreateFormProps {
  visible: boolean;
  onCreate: (values: ISkillCreate) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleCreate = () => {
    form.validateFields().then((values) => {
      onCreate(values);
      form.resetFields();
    });
  };

  const validator = [
    yupSync(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .required(t("SKILL.NAME_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  return (
    <Modal
      open={visible}
      title={t("SKILL.POSITION_CREATE")}
      okText='Create'
      onCancel={onCancel}
      onOk={handleCreate}
    >
      <Form form={form} layout='vertical'>
        <Form.Item name='name' label={t("SKILL.POSITION_NAME")} rules={validator}>
          <Input placeholder={t("SKILL.PLH")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const { Title } = Typography;
const PositionPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetPosition();
  const { mutate: deletePosition } = useDeletePosition();
  const { mutate: createPosition } = useCreatePosition();
  const { mutate: updatePosition } = useUpdatePosition();
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = (values: ISkillCreate) => {
    createPosition(values);
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleAction = (key: string, _item: ISkill) => {
    switch (key) {
      case "update":
        const position = _item.name;
        Modal.confirm({
          title: t("SKILL.POSITION_UPDATE"),
          content: (
            <Form name='basic' initialValues={{ name: _item?.name }} autoComplete='on'>
              <Form.Item
                label={t("SKILL.POSITION_NAME")}
                name='name'
                rules={[{ message: t("SKILL.NAME_REQUIRED") }]}
              >
                <Input
                  placeholder={t("SKILL.PLH")}
                  onChange={(e) => (_item.name = e?.target?.value)}
                />
              </Form.Item>
            </Form>
          ),
          okText: t("SKILL.UPDATE_BUTTON"),
          cancelText: t("SKILL.CANCEL"),
          onOk: () => {
            {
              if (_item.name === "") {
                messageApi.open({
                  type: "error",
                  content: t("SKILL.REQUIRED") as string,
                }),
                  (_item.name = position);
              } else if (_item.name !== position) {
                _item.name !== position && updatePosition({ name: _item?.name, id: _item?.id }),
                  (_item.name = position);
              }
            }
          },
          onCancel: () => {
            _item.name = position;
          },
        });
        break;
      case "delete":
        const positionName = _item.name || "";
        Modal.confirm({
          title: t("SKILL.POSITION_DELETE", { name: positionName }),
          okText: t("SKILL.OK_CREATE"),
          cancelText: t("SKILL.CANCEL"),
          onOk: () => deletePosition(_item.id),
        });
        break;
      default:
    }
  };

  return (
    <>
      {contextHolder}
      <Row style={{ marginLeft: 15, marginRight: 15 }}>
        <Col span={12}>
          <Title level={3}>{t("SKILL.POSITION_TITLE")}</Title>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type='primary' onClick={showModal}>
            {t("SKILL.CREATE_NEW_POSITION")}
          </Button>
          <CreateForm visible={visible} onCreate={handleCreate} onCancel={handleCancel} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={skillTable(handleAction, true)} loading={isLoading} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default PositionPage;
