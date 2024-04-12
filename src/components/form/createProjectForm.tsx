import i18n from "@/config/i18n";
import { StatusEnum } from "@/constants/enum";
import { useCreateProject } from "@/hooks/useProject";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { RootState } from "@/redux/store";
import { DownOutlined } from "@ant-design/icons";
import type { GetProps } from "antd";
import { Button, Col, DatePicker, Form, Input, Row, Select, type FormProps } from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupSync } from "../../helpers/validation";
import "./createProjectForm.scss";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);
const MAX_COUNT = 5;
type ProjectType = {
  name: string;
  description: string;
  date: string[];
  technical: string[];
  status: string;
  managerId: string;
  employeeId: string[];
};

type UserType = {
  fullName: string;
  email: string;
  user: {
    id: string;
  };
  isManager: boolean;
};

const CreateProjectForm: React.FC = () => {
  const { data } = useGetAllUserNoPagination();
  const technical = [
    "Angular",
    "React",
    "Vue",
    "NextJS",
    "NestJS",
    "NodeJS",
    "Golang",
    "Java",
    "Python",
    "C#",
    "C++",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "C",
    "C++",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
  ];
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const userLogin = useSelector((state: RootState) => state.auth.user);
  const [value, setValue] = React.useState<string[]>([]);
  const { mutate: createProject } = useCreateProject();

  // Date Picker
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined style={{ color: "#16c2c2", fontSize: "10px", paddingRight: "5px" }} />
    </>
  );

  // Validation
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
        endDate: Yup.date().required(t("CREATE_PROJECT.ENDDATE_REQUIRED") as string),
        technical: Yup.array().required(t("CREATE_PROJECT.TECHNICAL_REQUIRED") as string),
        status: Yup.string().required(t("CREATE_PROJECT.STATUS_REQUIRED") as string),
        managerId: Yup.string().required(t("CREATE_PROJECT.MANAGER_REQUIRED") as string),
        employeeId: Yup.array().required(t("CREATE_PROJECT.EMPLOYEE_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const onFinish: FormProps<ProjectType>["onFinish"] = (values) => {
    createProject({
      ...values,
      startDate: JSON.parse(JSON.stringify(values.date[0])),
      endDate: JSON.parse(JSON.stringify(values.date[1])),
      managerId: userLogin?.id,
    });
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Row gutter={[8, 4]}>
        <Col xs={24} sm={24} md={24} lg={12}>
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
            name='technical'
            label={t("CREATE_PROJECT.TECHNICAL")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Select
              mode='multiple'
              style={{ width: "100%" }}
              maxCount={MAX_COUNT}
              placeholder={t("CREATE_PROJECT.TECHNICAL_PLACEHOLDER") as string}
              onChange={setValue}
              suffixIcon={suffix}
              notFoundContent={null}
              options={technical.map((item) => ({
                value: item,
                label: item,
              }))}
            />
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
              disabledDate={disabledDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("11:59:59", "HH:mm:ss")],
              }}
              format='YYYY-MM-DD HH:mm:ss'
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item<ProjectType>
            name='status'
            label={t("CREATE_PROJECT.STATUS")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
          >
            <Select
              defaultValue={t("CREATE_PROJECT.PENDING") as string}
              suffixIcon={<DownOutlined />}
            >
              {Object.values(StatusEnum).map((type: string) => (
                <Select.Option key={type} value={type}>
                  {i18n.t(`CREATE_PROJECT.${type.toUpperCase()}`)}
                </Select.Option>
              ))}
            </Select>
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
              onChange={setValue}
              showSearch
              notFoundContent={null}
            >
              {data?.map((item: UserType) => (
                <Select.Option key={item?.user.id} value={item?.user.id}>
                  {item?.fullName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item<ProjectType>
            name='employeeId'
            label={t("CREATE_PROJECT.EMPLOYEE")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Select
              mode='multiple'
              style={{ width: "100%" }}
              placeholder={t("CREATE_PROJECT.EMPLOYEE_PLACEHOLDER") as string}
              onChange={setValue}
              notFoundContent={null}
            >
              {data?.map((item: UserType) => (
                <Select.Option key={item?.user.id} value={item?.user.id}>
                  {item?.fullName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item<ProjectType>
            name='description'
            label={t("CREATE_PROJECT.DESCRIPTION")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
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