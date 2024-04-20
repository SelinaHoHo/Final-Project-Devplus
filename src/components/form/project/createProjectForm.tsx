/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetLanguage } from "@/hooks/useLanguage";
import { useGetPosition } from "@/hooks/usePosition";
import { useCreateProject } from "@/hooks/useProject";
import { useGetTechnical } from "@/hooks/useTechnical";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { DataType, ProjectType, SkillType, UserType } from "@/interfaces/user/users.interface";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
  type FormProps,
} from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupSync } from "../../../helpers/validation";
import EmployeeFormTable from "./EmployeeFormTable";
import "./createProjectForm.scss";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
dayjs.extend(customParseFormat);

const CreateProjectForm: React.FC = () => {
  const { data: user } = useGetAllUserNoPagination();
  const { data: technical } = useGetTechnical();
  const { data: language } = useGetLanguage();
  const { data: position } = useGetPosition();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: createProject } = useCreateProject();
  const [messageApi, contextHolder] = message.useMessage();

  //table
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<DataType>({
    key: "",
    employeeId: "",
    roles: [],
  });

  const handleAddEmployee = (type: string, data: any) => {
    switch (type) {
      case "employeeId":
        setEmployeeData({ ...employeeData, employeeId: data, key: data });
        form.setFields([
          {
            name: "employeeId",
            errors: [],
          },
        ]);
        break;
      case "roles":
        setEmployeeData({ ...employeeData, roles: data });
        form.setFields([
          {
            name: "roles",
            errors: [],
          },
        ]);
        break;
      default:
        break;
    }
  };

  const handleAddRow = () => {
    schema
      .validate(employeeData, { abortEarly: false })
      .then(() => {
        if (dataSource.some((item) => item.employeeId === employeeData.employeeId)) {
          throw new Yup.ValidationError(
            t("CREATE_PROJECT.ALREADY_EXISTS"),
            employeeData,
            "employeeId",
          );
        }
        setDataSource([...dataSource, employeeData]);
      })
      .catch((error) => {
        if (
          error instanceof Yup.ValidationError &&
          dataSource.some((item) => item.employeeId === employeeData.employeeId)
        ) {
          messageApi.open({
            type: "error",
            content: t("CREATE_PROJECT.ALREADY_EXISTS"),
          });
        } else {
          const errors = error.inner.map((e: { path: string; message: string }) => ({
            name: e.path,
            errors: [e.message],
          }));
          form.setFields(errors);
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
      dataIndex: "employeeId",
      width: "30%",
      key: "employeeId",
      render: (employeeId: string) => (
        <Typography>
          {user?.find((item: any) => item.id === employeeId)?.profile?.fullName}
        </Typography>
      ),
    },
    {
      title: t("CREATE_PROJECT.ROLES"),
      dataIndex: "roles",
      width: "60%",
      key: "roles",
      render: (roles: string[]) => (
        <Typography>
          {roles
            .map((role: string) => {
              const po = position?.find((item: any) => item.id === role);
              return po ? po.name : null;
            })
            .join(", ")}
        </Typography>
      ),
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
    employeeId: Yup.string().required(t("CREATE_PROJECT.ERROR_NAME") as string),
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
        JSON.stringify(dataSource.map((item) => ({ id: item.employeeId, role: item.roles }))),
      ),
    });
    setDataSource([]);
    setTimeout(() => {
      form.resetFields();
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish} form={form} initialValues={{ items: [{}] }} id='prj'>
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
                format='YYYY-MM-DD'
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
                        {item?.profile?.fullName}
                      </Select.Option>
                    ),
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <EmployeeFormTable
              data={{
                user,
                position,
                employeeData,
                dataSource,
                defaultColumns,
                handleAddEmployee,
                handleAddRow,
              }}
            />
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
          <Button type='primary' size='large' htmlType='submit' form='prj'>
            {t("CREATE_PROJECT.SUBMIT")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProjectForm;
