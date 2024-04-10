import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, message, Radio, Row, Select, Table } from "antd";
import { Rule } from "antd/es/form";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupSync } from "../../helpers/validation";
import "./createUserForm.scss";

const { Option } = Select;

interface Employee {
  name: string;
  email: string;
  phone: number;
  dob: string;
  gender: string;
  status: string;
  skill: string[];
  position: string;
  department: string;
  startDate: string;
}

interface Technology {
  name: string;
  YoE: number;
}

const CreateUserForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const onChange = (e: RadioChangeEvent) => {
    setRole(e.target.value ?? "employee");
  };

  const onChangeStatus = (value: string) => {
    setStatus(value);
  };

  const disabledDate = (current: dayjs.Dayjs | null) => {
    const today = dayjs();

    const currentDayjs = dayjs(current);

    return currentDayjs.isAfter(today, "day");
  };

  const validator = [
    yupSync(
      Yup.object().shape({
        name: Yup.string().required(t("CREATE_EMPLOYEE.NAME_REQUIRED") as string),
        username: Yup.string().required(t("CREATE_EMPLOYEE.USERNAME_REQUIRED") as string),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, t("CREATE_EMPLOYEE.PHONEDIGITS_REQUIRED") as string)
          .required(t("CREATE_EMPLOYEE.PHONE_REQUIRED") as string),
        email: Yup.string()
          .email(t("CREATE_EMPLOYEE.INVALIDEMAIL_REQUIRED") as string)
          .required(t("CREATE_EMPLOYEE.EMAIL_REQUIRED") as string),
        dob: Yup.date().required(t("CREATE_EMPLOYEE.DOB_REQUIRED") as string),
        gender: Yup.string()
          .required(t("CREATE_EMPLOYEE.GENDER_REQUIRED") as string)
          .oneOf(["male", "female", "other"], "Invalid gender"),
        status: Yup.string().required(t("CREATE_EMPLOYEE.STATUS_REQUIRED") as string),
        role: Yup.string().required(t("CREATE_EMPLOYEE.ROLE_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const onFinish = (values: Employee) => {
    setLoading(true);
    // Simulating email sending
    setTimeout(() => {
      setLoading(false);
      message.success(`Email sent to ${values.email}`);
    }, 1500);
  };

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [YoE, setYoE] = useState<number | null>(null);
  const [tableData, setTableData] = useState<Technology[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: "NodeJs", label: "NodeJs" },
    { value: "ReactJS", label: "ReactJS" },
    { value: "Java", label: "Java" },
    { value: "C#", label: "C#" },
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
  ]);

  const [warning, setWarning] = useState<string | null>(null);

  const handleLanguageNameChange = (value: string) => {
    setSelectedTech(value);
  };

  const handleExperienceYearsChange = (value: string) => {
    setYoE(parseInt(value));
  };

  const handleSubmission = async () => {
    if (selectedTech && YoE !== null) {
      setTableData([...tableData, { name: selectedTech, YoE }]);
      setSelectedTech(null);
      setYoE(null);

      setOptions(options.filter((option) => option.value !== selectedTech));
      setWarning(null);
    } else {
      setWarning(t("CREATE_EMPLOYEE.WARNING"));
      message.error(t("CREATE_EMPLOYEE.WARNING"));
    }
  };

  const handleDelete = (name: string) => {
    const newData = tableData.filter((tech) => tech.name !== name);
    setTableData(newData);

    const deletedTech = tableData.find((tech) => tech.name === name);
    if (deletedTech) {
      setOptions([...options, { value: deletedTech.name, label: deletedTech.name }]);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <section className='section'>
        <h1>{t("CREATE_EMPLOYEE.PROFILE")}</h1>
        <hr />
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='name'
              label={t("CREATE_EMPLOYEE.NAME")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <Input prefix={<UserOutlined />} placeholder={t("CREATE_EMPLOYEE.NAME")} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='username'
              label={t("CREATE_EMPLOYEE.USERNAME")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <Input prefix={<UserOutlined />} placeholder={t("CREATE_EMPLOYEE.USERNAME")} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='phone'
              label={t("CREATE_EMPLOYEE.PHONE")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <Input
                prefix={<PhoneOutlined />}
                type='number'
                placeholder={t("CREATE_EMPLOYEE.PHONE")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='email'
              label={t("CREATE_EMPLOYEE.EMAIL")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <Input prefix={<MailOutlined />} placeholder={t("CREATE_EMPLOYEE.EMAIL")} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='dob'
              label={t("CREATE_EMPLOYEE.DOB")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={disabledDate}
                placeholder={t("CREATE_EMPLOYEE.DOB")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='gender'
              label={t("CREATE_EMPLOYEE.GENDER")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <Select placeholder={t("CREATE_EMPLOYEE.GENDER")}>
                <Option value='male'>{t("CREATE_EMPLOYEE.MALE")}</Option>
                <Option value='female'>{t("CREATE_EMPLOYEE.FEMALE")}</Option>
                <Option value='other'>{t("CREATE_EMPLOYEE.OTHER")}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='status'
              label={t("CREATE_EMPLOYEE.STATUS")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
            >
              <Select
                onChange={onChangeStatus}
                value={status}
                placeholder={t("CREATE_EMPLOYEE.STATUS")}
              >
                <Option value='pending'>{t("CREATE_EMPLOYEE.PENDING")}</Option>
                <Option value='in-progress'>{t("CREATE_EMPLOYEE.IN_PROGRESS")}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='role'
              label={t("CREATE_EMPLOYEE.ROLE")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              rules={validator}
              style={{ padding: "10px" }}
            >
              <Radio.Group onChange={onChange} value={role}>
                <Radio value='employee'>{t("CREATE_EMPLOYEE.EMPLOYEE")}</Radio>
                <Radio value='manage'>{t("CREATE_EMPLOYEE.MANAGER")}</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </section>

      <section className='section'>
        <h1>{t("CREATE_EMPLOYEE.SKILL")}</h1>
        <hr style={{ marginBottom: "20px" }} />
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Select
                  placeholder={t("CREATE_EMPLOYEE.TECHNOLOGY")}
                  onChange={handleLanguageNameChange}
                  value={selectedTech}
                  optionFilterProp='children'
                  style={{ width: "100%" }}
                >
                  {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12}>
                <Input
                  placeholder={t("CREATE_EMPLOYEE.YOE")}
                  type='number'
                  value={YoE !== null ? YoE : ""}
                  onChange={(e) => handleExperienceYearsChange(e.target.value)}
                  style={{ padding: "24px 20px" }}
                />
              </Col>
            </Row>
            {warning && <p style={{ color: "red" }}>{warning}</p>}
            <br />
            <Button onClick={handleSubmission}>{t("CREATE_EMPLOYEE.ADD_SKILL")}</Button>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Table
              columns={[
                { title: t("CREATE_EMPLOYEE.TECHNOLOGY"), dataIndex: "name", key: "name" },
                { title: t("CREATE_EMPLOYEE.YOE"), dataIndex: "YoE", key: "YoE" },
                {
                  title: t("CREATE_EMPLOYEE.ACTION"),
                  key: "action",
                  render: (record) => (
                    <Button onClick={() => handleDelete(record.name)}>
                      {t("CREATE_EMPLOYEE.DELETE")}
                    </Button>
                  ),
                },
              ]}
              dataSource={tableData}
              pagination={false}
              scroll={{ y: 250 }}
              bordered
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row></Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Col>
        </Row>
      </section>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          {t("CREATE_EMPLOYEE.SUBMIT")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
