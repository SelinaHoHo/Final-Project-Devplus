/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetLanguage } from "@/hooks/useLanguage";
import { useGetPosition } from "@/hooks/usePosition";
import { useCreateProject } from "@/hooks/useProject";
import { useGetTechnical } from "@/hooks/useTechnical";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
  type FormProps,
} from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupSync } from "../../helpers/validation";
import "./createProjectForm.scss";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
dayjs.extend(customParseFormat);

interface DataType {
  key: React.Key;
  name: string;
  roles: string[];
}

type ProjectType = {
  name: string;
  description: string;
  date: string[];
  language: string[];
  technical: string[];
  managerId: string;
  employeeId: {
    id: string;
    roles: string[];
  };
};

type UserType = {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
};

type SkillType = {
  id: string;
  name: string;
};

const CreateProjectForm: React.FC = () => {
  const { data: user } = useGetAllUserNoPagination();
  const { data: technical } = useGetTechnical();
  const { data: language } = useGetLanguage();
  const { data: position } = useGetPosition();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: createProject } = useCreateProject();

  //table
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<DataType>({
    key: "",
    name: "",
    roles: [],
  });

  const handleAddEmployee = (type: string, data: any) => {
    switch (type) {
      case "name":
        setEmployeeData({ ...employeeData, name: data, key: data });
        break;
      case "roles":
        setEmployeeData({ ...employeeData, roles: data });
        break;
      default:
        break;
    }
  };

  const handleAddRow = () => {
    schema
      .validate(employeeData, { abortEarly: false })
      .then(() => {
        if (dataSource.some((item) => item.key === employeeData.name)) {
          throw new Yup.ValidationError(t("CREATE_PROJECT.ALREADY_EXISTS"), employeeData, "name");
        }
        setDataSource([...dataSource, employeeData]);
      })
      .catch((error) => {
        if (error instanceof Yup.ValidationError) {
          alert(t("CREATE_PROJECT.ERROR"));
        } else {
          alert(t("CREATE_PROJECT.ERROR"));
        }
      });
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: t("CREATE_PROJECT.NAME"),
      dataIndex: "name",
      width: "30%",
      key: "name",
      render: (name: string) => (
        <Typography>{user?.find((item: any) => item.id === name)?.userName}</Typography>
      ),
    },
    {
      title: t("CREATE_PROJECT.ROLES"),
      dataIndex: "roles",
      width: "60%",
      key: "roles",
      render: (roles: string[]) => roles.join(", "),
    },
    {
      title: t("CREATE_PROJECT.ACTION"),
      dataIndex: "operation",
      render: (_: any, record: DataType) =>
        dataSource.length >= 1 ? (
          <a style={{ color: "#16c2c2" }} onClick={() => handleDelete(record.key)}>
            {t("CREATE_PROJECT.DELETE")}
          </a>
        ) : null,
    },
  ];

  // Validation
  const schema = Yup.object().shape({
    name: Yup.string().required(t("CREATE_PROJECT.ERROR_NAME") as string),
    roles: Yup.array().min(1, t("CREATE_PROJECT.ERROR_ROLES") as string),
  });

  const validator = [
    yupSync(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .required(t("CREATE_PROJECT.NAME_REQUIRED") as string),
        description: Yup.string()
          .trim()
          .required(t("CREATE_PROJECT.DESCRIPTION_REQUIRED") as string),
        date: Yup.array().required(t("CREATE_PROJECT.DATE_REQUIRED") as string),
        technical: Yup.array().required(t("CREATE_PROJECT.TECHNICAL_REQUIRED") as string),
        language: Yup.array().required(t("CREATE_PROJECT.TECHNICAL_REQUIRED") as string),
        status: Yup.string().required(t("CREATE_PROJECT.STATUS_REQUIRED") as string),
        managerId: Yup.string().required(t("CREATE_PROJECT.MANAGER_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const onFinish: FormProps<ProjectType>["onFinish"] = (values) => {
    createProject({
      ...values,
      startDate: JSON.parse(JSON.stringify(values.date[0])),
      endDate: JSON.parse(JSON.stringify(values.date[1])),
      employeeId: JSON.parse(
        JSON.stringify(dataSource.map((item) => ({ id: item.name, role: item.roles }))),
      ),
    });
    setDataSource([]);
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish} form={form} initialValues={{ items: [{}] }}>
      <Row gutter={[8, 4]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item<ProjectType>
            name='name'
            label={t("CREATE_PROJECT.NAME")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Input placeholder={t("CREATE_PROJECT.NAMEDES")} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item<ProjectType>
            name='date'
            label={t("CREATE_PROJECT.DATE")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <RangePicker
              style={{ width: "100%" }}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("11:59:59", "HH:mm:ss")],
              }}
              format='YYYY-MM-DD HH:mm:ss'
              placeholder={[
                t("CREATE_PROJECT.STARTDATE") as string,
                t("CREATE_PROJECT.ENDDATE") as string,
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item<ProjectType>
            name='technical'
            label={t("CREATE_PROJECT.TECHNICAL")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Select
              mode='multiple'
              style={{ width: "100%" }}
              placeholder={t("CREATE_PROJECT.TECHNICAL_PLACEHOLDER") as string}
              notFoundContent={null}
              options={technical?.map((item: SkillType) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item<ProjectType>
            name='language'
            label={t("CREATE_PROJECT.LANGUAGE")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Select
              mode='multiple'
              style={{ width: "100%" }}
              placeholder={t("CREATE_PROJECT.LANGUAGE_PLACEHOLDER") as string}
              notFoundContent={null}
              options={language?.map((item: SkillType) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item<ProjectType>
            name='managerId'
            label={t("CREATE_PROJECT.MANAGER")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Select
              style={{ width: "100%" }}
              placeholder={t("CREATE_PROJECT.MANAGER_PLACEHOLDER") as string}
              showSearch
              notFoundContent={null}
            >
              {user?.map(
                (item: UserType) =>
                  item.isManager && (
                    <Select.Option key={item?.id} value={item?.id}>
                      {item?.userName}
                    </Select.Option>
                  ),
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Row gutter={[8, 4]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name='employeeId'
                label={t("CREATE_PROJECT.EMPLOYEE")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder={t("CREATE_PROJECT.EMPLOYEE_NAME") as string}
                  showSearch
                  notFoundContent={null}
                  onChange={(e) => handleAddEmployee("name", e)}
                  value={employeeData?.name}
                >
                  {user?.map(
                    (item: UserType) =>
                      !item.isManager && (
                        <Select.Option key={item?.id} value={item?.id}>
                          {item?.userName}
                        </Select.Option>
                      ),
                  )}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name='roles'
                label={t("CREATE_PROJECT.ROLES")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              >
                <Select
                  mode='multiple'
                  style={{ width: "100%" }}
                  placeholder={t("CREATE_PROJECT.EMPLOYEE_ROLES") as string}
                  notFoundContent={null}
                  options={position?.map((item: SkillType) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  onChange={(e) => handleAddEmployee("roles", e)}
                  value={employeeData?.roles}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Form.Item>
                <Button onClick={handleAddRow} type='dashed' block icon={<PlusOutlined />}>
                  {t("CREATE_PROJECT.CREATE_EMPLOYEE")}
                </Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                name={"employees"}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                label={t("CREATE_PROJECT.EMPLOYEE_LIST")}
              >
                <Table
                  rowClassName={() => "editable-row"}
                  dataSource={dataSource}
                  columns={defaultColumns}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item<ProjectType>
            name='description'
            label={t("CREATE_PROJECT.DESCRIPTION")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
          >
            <TextArea placeholder={t("CREATE_PROJECT.DESCRIPTIONDES")} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type='primary' size='large' htmlType='submit'>
          {t("CREATE_PROJECT.SUBMIT")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProjectForm;
