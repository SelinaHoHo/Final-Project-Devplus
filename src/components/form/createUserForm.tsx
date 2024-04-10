import { DeleteOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, message, Radio, Row, Select, Table } from "antd";
import { Rule } from "antd/es/form";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
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

interface Language {
  name: string;
  experience: string;
}

const CreateUserForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [role, setRole] = useState("employee");
  const [status, setStatus] = useState("pending");

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

  // test
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageName, setLanguageName] = useState("Select language");
  const [experienceYears, setExperienceYears] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([
    "ReactJS",
    "NodeJS",
    "HTML",
    "SQL",
    "JAVA",
  ]);

  const handleLanguageNameChange = (value: string) => {
    setLanguageName(value);
  };

  const handleExperienceYearsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExperienceYears(e.target.value);
  };

  const handleAddLanguage = () => {
    if (languageName && experienceYears) {
      const newLanguage: Language = { name: languageName, experience: experienceYears };
      setLanguages([...languages, newLanguage]);
      setAvailableLanguages((prevLanguages) =>
        prevLanguages.filter((lang) => lang !== languageName),
      );
      setLanguageName("");
      setExperienceYears("");
    }
  };

  const handleDeleteLanguage = (languageToDelete: Language) => {
    const updatedLanguages = languages.filter(
      (language) => language.name !== languageToDelete.name,
    );
    setLanguages(updatedLanguages);
    setAvailableLanguages((prevLanguages) => [...prevLanguages, languageToDelete.name]);
  };

  const columns = [
    {
      title: "Language Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Years of Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Actions",
      render: (record: Language) => (
        <Button onClick={() => handleDeleteLanguage(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Form onFinish={onFinish}>
      <h1>Profile</h1>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item
            name='name'
            label={t("CREATE_EMPLOYEE.NAME")}
            labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            rules={validator}
          >
            <Input prefix={<UserOutlined />} />
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
            <Input prefix={<UserOutlined />} />
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
            <Input prefix={<PhoneOutlined />} type='number' />
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
            <Input prefix={<MailOutlined />} />
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
            <DatePicker style={{ width: "100%" }} disabledDate={disabledDate} />
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
            <Select>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
              <Option value='other'>Other</Option>
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
            <Select onChange={onChangeStatus} value={status}>
              <Option value='pending'>Pending</Option>
              <Option value='in-progress'>In progress</Option>
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
              <Radio value='employee'>Employee</Radio>
              <Radio value='manage'>Manager</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <h1>Skill</h1>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Select
                value={languageName}
                onChange={handleLanguageNameChange}
                style={{ width: "100%" }}
              >
                {availableLanguages.map((lang) => (
                  <Option key={lang} value={lang}>
                    {lang}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Input
                placeholder='Enter years of experience'
                value={experienceYears}
                onChange={handleExperienceYearsChange}
                style={{ padding: "24px 20px" }}
              />
            </Col>
          </Row>
          <br />
          <Button onClick={handleAddLanguage}>Add Language</Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Table
            columns={columns}
            dataSource={languages}
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
      <br />
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          {t("CREATE_EMPLOYEE.SUBMIT")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
