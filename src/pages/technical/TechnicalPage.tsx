/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skillTable } from "@/components/skill/skillTable";
import { yupSync } from "@/helpers/validation";
import {
  useCreateTechnical,
  useDeleteTechnical,
  useGetTechnical,
  useUpdateTechnical,
} from "@/hooks/useTechnical";
import ISkill, { ISkillCreate } from "@/interfaces/skill/skills.interface";
import { Button, Col, Form, Input, Modal, Row, Table, Typography, message } from "antd";
import { Rule } from "antd/es/form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import "../project/Create/createProject.scss";

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
      title={t("SKILL.TECH_CREATE")}
      okText='Create'
      onCancel={onCancel}
      onOk={handleCreate}
    >
      <Form form={form} layout='vertical'>
        <Form.Item name='name' label={t("SKILL.TECH_NAME")} rules={validator}>
          <Input placeholder={t("SKILL.PLH")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const { Title } = Typography;
const TechnicalPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetTechnical();
  const { mutate: deleteTechnical } = useDeleteTechnical();
  const { mutate: createTechnical } = useCreateTechnical();
  const { mutate: updateTechnical } = useUpdateTechnical();
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const validator = [
    yupSync(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .required(t("SKILL.NAME_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const handleCreate = (values: ISkillCreate) => {
    createTechnical(values);
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
        const technical = _item.name;
        Modal.confirm({
          title: t("SKILL.TECH_UPDATE"),
          content: (
            <Form name='basic' initialValues={{ name: _item?.name }} autoComplete='on'>
              <Form.Item label={t("SKILL.TECH_NAME")} name='name' rules={validator}>
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
                  (_item.name = technical);
              } else if (_item.name !== technical) {
                _item.name !== technical && updateTechnical({ name: _item?.name, id: _item?.id }),
                  (_item.name = technical);
              }
            }
          },
          onCancel: () => {
            _item.name = technical;
          },
        });
        break;
      case "delete":
        const technicalName = _item.name || "";
        Modal.confirm({
          title: t("SKILL.TECH_DELETE", { name: technicalName }),
          okText: t("SKILL.OK_CREATE"),
          cancelText: t("SKILL.CANCEL"),
          onOk: () => deleteTechnical(_item.id),
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
          <Title level={3}>{t("SKILL.TECH_TITLE")}</Title>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type='primary' onClick={showModal}>
            {t("SKILL.CREATE_NEW_TECH")}
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

export default TechnicalPage;
