/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupSync } from "@/helpers/validation";
import { useGetTechs } from "@/hooks/useTech";
import { useDeleteTechnical, usePostTechnical } from "@/hooks/useUser";
import { technicalMember } from "@/interfaces/user/users.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, Typography } from "antd";
import { Rule } from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

type DataProps = {
  dataSourceT: technicalMember[];
};

const UpdateTechnicalTable: FC<DataProps> = ({ dataSourceT }) => {
  const { id } = useParams();
  const { data: technologies } = useGetTechs();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: postTechnical } = usePostTechnical();
  const { mutate: deleteTechnical } = useDeleteTechnical();

  const filteredTechnicalMembers = technologies?.filter((lang) => {
    return !dataSourceT.some((user) => user.technical.id === lang.id);
  });

  const columns: ColumnsType<technicalMember> = [
    {
      title: t("UPDATE_EMPLOYEE.TECHNICAL"),
      dataIndex: "name",
      width: "50%",
      key: "name",
      render: (_text, _record) => <Typography>{_record?.technical?.name}</Typography>,
    },
    {
      title: t("UPDATE_EMPLOYEE.LEVEL"),
      dataIndex: "level",
      width: "20%",
      key: "level",
      render: (_text, _record) => <Typography>{_record.level}</Typography>,
    },
    {
      title: t("UPDATE_EMPLOYEE.EXPERIENCE"),
      dataIndex: "experience",
      width: "20%",
      key: "experience",
      render: (_text, _record) => <Typography>{_record.experience}</Typography>,
    },
    {
      title: t("UPDATE_EMPLOYEE.ACTION"),
      dataIndex: "operation",
      render: (_: any, _record) =>
        dataSourceT.length >= 1 ? (
          <a style={{ color: "#16c2c2" }} onClick={() => handleDelete(_record.id)}>
            {t("UPDATE_EMPLOYEE.DELETE")}
          </a>
        ) : null,
    },
  ];

  const validator = [
    yupSync(
      Yup.object().shape({
        id: Yup.string().required(t("UPDATE_EMPLOYEE.TECHNICAL_REQUIRED") as string),
        experience: Yup.number()
          .typeError(t("UPDATE_EMPLOYEE.EXPERIENCE_REQUIRED_NUMBER") as string)
          .positive(t("UPDATE_EMPLOYEE.EXPERIENCE_POSITIVE") as string)
          .integer(t("UPDATE_EMPLOYEE.EXPERIENCE_INTEGER") as string)
          .required(t("UPDATE_EMPLOYEE.EXPERIENCE_REQUIRED") as string),
        level: Yup.number()
          .typeError(t("UPDATE_EMPLOYEE.LEVEL_REQUIRED_NUMBER") as string)
          .positive(t("UPDATE_EMPLOYEE.LEVEL_POSITIVE") as string)
          .integer(t("UPDATE_EMPLOYEE.LEVEL_INTEGER") as string)
          .required(t("UPDATE_EMPLOYEE.LEVEL_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const onFinish = (values: technicalMember) => {
    const userId = {
      ...values,
      userId: id,
    };
    postTechnical(userId);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    deleteTechnical(id);
  };

  return (
    <Row gutter={[8, 4]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[8, 4]}>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.TECHNICAL")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='id'
                rules={validator}
              >
                <Select placeholder={t("UPDATE_EMPLOYEE.CODING_LANGUAGE")}>
                  {filteredTechnicalMembers?.map((technology) => (
                    <Select.Option key={technology.id} value={technology.id}>
                      {technology.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.LEVEL")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='level'
                rules={validator}
              >
                <Input placeholder={t("UPDATE_EMPLOYEE.LEVEL")} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.EXPERIENCE")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='experience'
                rules={validator}
              >
                <Input placeholder={t("UPDATE_EMPLOYEE.EXPERIENCE")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item>
                <Button htmlType='submit' type='dashed' block icon={<PlusOutlined />}>
                  {t("UPDATE_EMPLOYEE.SUBMIT")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Table<technicalMember>
          rowClassName={() => "editable-row"}
          dataSource={dataSourceT}
          columns={columns}
        />
      </Col>
    </Row>
  );
};

export default UpdateTechnicalTable;
