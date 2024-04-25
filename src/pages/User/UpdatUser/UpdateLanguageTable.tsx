/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupSync } from "@/helpers/validation";
import { useGetLangs } from "@/hooks/useLang";
import { useDeleteLanguage, usePostLanguage } from "@/hooks/useUser";
import { languageMember } from "@/interfaces/user/users.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, Typography } from "antd";
import { Rule } from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

type DataProps = {
  dataSource: languageMember[];
};

const UpdateLanguageTable: FC<DataProps> = ({ dataSource }) => {
  const { id } = useParams();
  const { data: languages } = useGetLangs();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: postLanguage } = usePostLanguage();
  const { mutate: deleteLanguage } = useDeleteLanguage();
  const filteredLanguages = languages?.filter((lang) => {
    return !dataSource.some((user) => user.language.id === lang.id);
  });

  const columns: ColumnsType<languageMember> = [
    {
      title: t("CREATE_PROJECT.NAME"),
      dataIndex: "name",
      width: "50%",
      key: "name",
      render: (_text, _record) => <Typography>{_record?.language?.name}</Typography>,
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
        dataSource.length >= 1 ? (
          <a onClick={() => handleDelete(_record.id)} style={{ color: "#16c2c2" }}>
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

  const handleDelete = (id: string) => {
    deleteLanguage(id);
  };

  const onFinish = (values: languageMember) => {
    const userId = {
      ...values,
      userId: id,
    };
    postLanguage(userId);
    form.resetFields();
  };

  return (
    <Row gutter={[8, 4]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[8, 4]}>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                name='id'
                label={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <Select placeholder={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}>
                  {filteredLanguages?.map((language) => (
                    <Select.Option key={language.id} value={language.id}>
                      {language.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("CREATE_EMPLOYEE.LEVEL")}
                name='level'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <Input placeholder={t("CREATE_EMPLOYEE.LEVEL")} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
              <Form.Item
                label={t("CREATE_EMPLOYEE.EXPERIENCE")}
                name='experience'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
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
        </Form>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Table<languageMember>
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
        />
      </Col>
    </Row>
  );
};

export default UpdateLanguageTable;
