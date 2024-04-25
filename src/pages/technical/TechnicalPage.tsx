/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@/components/core/Table/Table";
import { skillTable } from "@/components/skill/skillTable";
import i18n from "@/config/i18n";
import { yupSync } from "@/helpers/validation";
import {
  useCreateTechnical,
  useDeleteTechnical,
  useGetTechnicals,
  useUpdateTechnical,
} from "@/hooks/useTechnical";
import ISkill, { ISkillCreate } from "@/interfaces/skill/skills.interface";
import { RootState } from "@/redux/store";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { Rule } from "antd/es/form";
import React, { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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

const TechnicalPage = () => {
  const { t } = useTranslation();
  const { mutate: deleteTechnical } = useDeleteTechnical();
  const { mutate: createTechnical } = useCreateTechnical();
  const { mutate: updateTechnical } = useUpdateTechnical();
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { theme } = useSelector((state: RootState) => state.global);

  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });

  const [filterName, setFilterName] = useState("");

  const paginatorSearch = {
    name: filterName,
    page: table.page,
    take: table.take,
  };
  const { data, isLoading, refetch } = useGetTechnicals(paginatorSearch);

  const validator = [
    yupSync(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .required(t("SKILL.NAME_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const onSearch = () => {
    setTable({
      page: 1,
      take: 10,
    });
    refetch();
  };

  const handleChangeSearch = async (value: string) => {
    if (value === "") {
      await setFilterName(value);
      refetch();
    } else {
      setFilterName(value);
    }
  };

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
    <div className='page-create-project'>
      {contextHolder}
      {theme === "dark" ? (
        <div className='form-create-dark'>
          <Row gutter={[8, 4]} style={{ marginBottom: "10px" }}>
            <Col span={6}>
              <Input
                placeholder={i18n.t("SKILL.SEARCH_TECH") as string}
                size='middle'
                allowClear
                onChange={(value) => handleChangeSearch(value.target.value)}
              />
            </Col>
            <Col span={6}>
              <Button type='primary' onClick={onSearch} size='middle'>
                <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
              </Button>
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
              <Table
                paginate={{
                  table,
                  setTable,
                  total: data?.meta.itemCount || 1,
                  pageCount: data?.meta.pageCount || 10,
                }}
                columns={skillTable(handleAction, true)}
                loading={isLoading}
                dataSource={data?.data}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div className='form-create-light'>
          <Row gutter={[8, 4]} style={{ marginBottom: "10px" }}>
            <Col span={6}>
              <Input
                placeholder={i18n.t("SKILL.SEARCH_TECH")}
                size='middle'
                allowClear
                onChange={(value) => handleChangeSearch(value.target.value)}
              />
            </Col>
            <Col span={6}>
              <Button type='primary' onClick={onSearch} size='middle'>
                <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
              </Button>
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
              <Table
                paginate={{
                  table,
                  setTable,
                  total: data?.meta.itemCount || 1,
                  pageCount: data?.meta.pageCount || 10,
                }}
                columns={skillTable(handleAction, true)}
                loading={isLoading}
                dataSource={data?.data}
              />
              <Table loading={isLoading} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default TechnicalPage;
