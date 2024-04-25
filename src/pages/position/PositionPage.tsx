/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@/components/core/Table/Table";
import { skillTable } from "@/components/skill/skillTable";
import i18n from "@/config/i18n";
import { yupSync } from "@/helpers/validation";
import {
  useCreatePosition,
  useDeletePosition,
  useGetPositions,
  useUpdatePosition,
} from "@/hooks/usePosition";
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

const PositionPage = () => {
  const { t } = useTranslation();
  const { mutate: deletePosition } = useDeletePosition();
  const { mutate: createPosition } = useCreatePosition();
  const { mutate: updatePosition } = useUpdatePosition();
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
  const { data, isLoading, refetch } = useGetPositions(paginatorSearch);

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
          },
          onCancel: () => {
            _item.name = position;
          },
        });
        break;
      case "delete":
        Modal.confirm({
          title: t("SKILL.TECH_DELETE", { name: _item.name }),
          okText: t("SKILL.OK_CREATE"),
          cancelText: t("SKILL.CANCEL"),
          onOk: () => deletePosition(_item.id),
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
            <Col span={4}>
              <Input
                placeholder={i18n.t("SKILL.SEARCH_POSITION")}
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
            <Col span={14} style={{ textAlign: "right" }}>
              <Button type='primary' onClick={showModal}>
                {t("SKILL.CREATE_NEW_POSITION")}
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
            <Col span={4}>
              <Input
                placeholder={i18n.t("SKILL.SEARCH_POSITION")}
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
            <Col span={14} style={{ textAlign: "right" }}>
              <Button type='primary' onClick={showModal}>
                {t("SKILL.CREATE_NEW_POSITION")}
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
      )}
    </div>
  );
};

export default PositionPage;
