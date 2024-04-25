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

  const columns: ColumnsType<technicalMember> = [
    {
      title: t("CREATE_PROJECT.NAME"),
      dataIndex: "name",
      width: "50%",
      key: "name",
      render: (_text, _record) => <Typography>{_record?.technical?.name}</Typography>,
    },
    {
      title: t("CREATE_PROJECT.ROLES"),
      dataIndex: "level",
      width: "20%",
      key: "level",
      render: (_text, _record) => <Typography>{_record.level}</Typography>,
    },
    {
      title: t("CREATE_PROJECT.ROLES"),
      dataIndex: "experience",
      width: "20%",
      key: "experience",
      render: (_text, _record) => <Typography>{_record.experience}</Typography>,
    },
    {
      title: t("CREATE_PROJECT.ACTION"),
      dataIndex: "operation",
      render: (_: any, _record) =>
        dataSourceT.length >= 1 ? (
          <a style={{ color: "#16c2c2" }} onClick={() => handleDelete(_record.id)}>
            {t("CREATE_PROJECT.DELETE")}
          </a>
        ) : null,
    },
  ];

  const validator = [
    yupSync(
      Yup.object().shape({
        id: Yup.string().required(t("CREATE_EMPLOYEE.NAME_REQUIRED") as string),
        experience: Yup.number()
          .typeError(t("CREATE_EMPLOYEE.EXPERIENCE_REQUIRED") as string)
          .positive(t("CREATE_EMPLOYEE.EXPERIENCE_POSITIVE") as string)
          .integer(t("CREATE_EMPLOYEE.EXPERIENCE_INTEGER") as string)
          .required(t("CREATE_EMPLOYEE.EXPERIENCE_REQUIRED") as string),
        level: Yup.number()
          .typeError(t("CREATE_EMPLOYEE.LEVEL_REQUIRED") as string)
          .positive(t("CREATE_EMPLOYEE.LEVEL_POSITIVE") as string)
          .integer(t("CREATE_EMPLOYEE.LEVEL_INTEGER") as string)
          .required(t("CREATE_EMPLOYEE.LEVEL_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const onFinish = (values: technicalMember) => {
    const userId = {
      ...values,
      userId: id,
    };
    postTechnical(userId);
  };

  const handleDelete = (id: string) => {
    deleteTechnical(id);
  };

  return (
    <Row gutter={[8, 4]}>
      <Form form={form} onFinish={onFinish}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Row gutter={[8, 4]}>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='id'
                rules={validator}
              >
                <Select placeholder={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}>
                  {technologies?.map((technology) => (
                    <Select.Option value={technology.id}>{technology.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("CREATE_EMPLOYEE.LEVEL")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='level'
                rules={validator}
              >
                <Input placeholder={t("CREATE_EMPLOYEE.LEVEL")} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("CREATE_EMPLOYEE.EXPERIENCE")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='experience'
                rules={validator}
              >
                <Input placeholder={t("CREATE_EMPLOYEE.EXPERIENCE")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item>
                <Button htmlType='submit' type='dashed' block icon={<PlusOutlined />}>
                  {t("CREATE_PROJECT.CREATE_LANGUAGE")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name={"employees"}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            label={t("CREATE_PROJECT.EMPLOYEE_LIST")}
          >
            <Table<technicalMember>
              rowClassName={() => "editable-row"}
              dataSource={dataSourceT}
              columns={columns}
            />
          </Form.Item>
        </Col>
      </Form>
    </Row>
  );
};

export default UpdateTechnicalTable;
