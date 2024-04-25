import { createUser } from "@/apis/user.api";
import { useGetLangs } from "@/hooks/useLang";
import { useGetPosition } from "@/hooks/usePosition";
import { useGetTechs } from "@/hooks/useTech";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
import { Rule } from "antd/es/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { yupSync } from "../../../helpers/validation";

interface LanguageMember {
  id: string;
  key: string;
  level: string;
  experience: string;
}

interface TechnicalMember {
  id: string;
  key: string;
  level: string;
  experience: string;
}

const CreateEmployeeForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: languages } = useGetLangs();
  const { data: technologies } = useGetTechs();
  const { data: positions } = useGetPosition();
  const { data: users } = useGetAllUserNoPagination();

  const validator = [
    yupSync(
      Yup.object().shape({
        fullName: Yup.string().required(t("CREATE_EMPLOYEE.NAME_REQUIRED") as string),
        email: Yup.string()
          .email(t("CREATE_EMPLOYEE.INVALIDEMAIL_REQUIRED") as string)
          .required(t("CREATE_EMPLOYEE.EMAIL_REQUIRED") as string),
        address: Yup.string().required(t("CREATE_EMPLOYEE.ADDRESS_REQUIRED") as string),
        dayOfBirth: Yup.date().required(t("CREATE_EMPLOYEE.DOB_REQUIRED") as string),
        description: Yup.string().required(t("CREATE_EMPLOYEE.DESCRIPTION_REQUIRED") as string),
        isManager: Yup.string().required(t("CREATE_EMPLOYEE.IS_MANAGER_REQUIRED") as string),
        managerId: Yup.string().required(t("CREATE_EMPLOYEE.MANAGED_BY_REQUIRED") as string),
        language: Yup.array().required(t("CREATE_EMPLOYEE.LANGUAGE_REQUIRED") as string),
        technical: Yup.array().required(t("CREATE_EMPLOYEE.TECHNICAL_REQUIRED") as string),
        positions: Yup.array().required(t("CREATE_EMPLOYEE.POSITIONS_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const [managedByInputVisible, setManagedByInputVisible] = useState(false);

  const handleProfileSelect = (e: RadioChangeEvent) => {
    setManagedByInputVisible(e.target.value === false);
  };

  const getEighteenYearsAgo = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return eighteenYearsAgo;
  };

  const [tableDataLanguage, setTableDataLanguage] = useState<LanguageMember[]>([]);
  const [languageMember, setLanguageMember] = useState("");
  const [levelLanguage, setLevelLanguage] = useState("");
  const [experienceLanguage, setExperienceLanguage] = useState("");

  const handleAddDataLanguage = () => {
    if (languageMember && levelLanguage && experienceLanguage) {
      const newData: LanguageMember = {
        key: uuidv4(),
        id: languageMember,
        level: levelLanguage,
        experience: experienceLanguage,
      };

      const isDuplicate = tableDataLanguage.some((item) => item.id === newData.id);

      if (isDuplicate) {
        notification.error({
          message: t("CREATE_EMPLOYEE.FAIL"),
          description: t("CREATE_EMPLOYEE.DUPLICATE_LANG"),
          placement: "top",
        });
      } else {
        notification.success({
          message: t("CREATE_EMPLOYEE.SUCCESS"),
          description: t("CREATE_EMPLOYEE.ADD_SUCCESS"),
          placement: "top",
        });
        setTableDataLanguage([...tableDataLanguage, newData]);
        setLanguageMember("");
        setLevelLanguage("");
        setExperienceLanguage("");
      }
    } else {
      notification.error({
        message: t("CREATE_EMPLOYEE.FAIL"),
        description: t("CREATE_EMPLOYEE.FAIL_LANG"),
        placement: "top",
      });
    }
  };

  const handleDeleteLanguage = (key: string) => {
    setTableDataLanguage(tableDataLanguage.filter((item) => item.key !== key));
  };

  const columnsLanguage = [
    {
      title: t("CREATE_EMPLOYEE.LANGUAGE_FRAMEWORK"),
      dataIndex: "languageMember",
      key: "languageMember",
      render: (_text: string, record: LanguageMember) => (
        <Typography>{languages?.find((language) => language.id === record.id)?.name}</Typography>
      ),
      width: "50%",
    },
    {
      title: t("CREATE_EMPLOYEE.LEVEL"),
      dataIndex: "level",
      key: "level",
      render: (_text: string, record: LanguageMember) => record?.level,
      width: 200,
    },
    {
      title: t("CREATE_EMPLOYEE.EXPERIENCE"),
      dataIndex: "experience",
      key: "experience",
      render: (_text: string, record: LanguageMember) => record?.experience,
      width: 200,
    },
    {
      title: t("CREATE_EMPLOYEE.ACTION"),
      key: "action",
      render: (_text: string, record: LanguageMember) => (
        <Button onClick={() => handleDeleteLanguage(record.key)}>
          <DeleteOutlined />
        </Button>
      ),
      width: 200,
    },
  ];

  const [tableDataTechnical, setTableDataTechnical] = useState<TechnicalMember[]>([]);
  const [technicalMember, setTechnicalMember] = useState("");
  const [levelTechnical, setLevelTechnical] = useState("");
  const [experienceTechnical, setExperienceTechnical] = useState("");

  const handleAddDataTechnical = () => {
    if (technicalMember && levelTechnical && experienceTechnical) {
      const newData = {
        key: "",
        id: technicalMember,
        level: levelTechnical,
        experience: experienceTechnical,
      };

      const isDuplicate = tableDataTechnical.some((item) => item.id === newData.id);

      if (isDuplicate) {
        notification.error({
          message: t("CREATE_EMPLOYEE.FAIL"),
          description: t("CREATE_EMPLOYEE.DUPLICATE_TECH"),
          placement: "top",
        });
      } else {
        notification.success({
          message: t("CREATE_EMPLOYEE.SUCCESS"),
          description: t("CREATE_EMPLOYEE.ADD_SUCCESS"),
          placement: "top",
        });
        setTableDataTechnical([...tableDataTechnical, newData]);
        setTechnicalMember("");
        setLevelTechnical("");
        setExperienceTechnical("");
      }
    } else {
      notification.error({
        message: t("CREATE_EMPLOYEE.FAIL"),
        description: t("CREATE_EMPLOYEE.FAIL_TECH"),
        placement: "top",
      });
    }
  };

  const handleDeleteTechnical = (key: string) => {
    setTableDataTechnical(tableDataTechnical.filter((item) => item.key !== key));
  };

  const columnsTechnical = [
    {
      title: t("CREATE_EMPLOYEE.TECHNOLOGY"),
      dataIndex: "technicalMember",
      key: "technicalMember",
      render: (_text: string, record: TechnicalMember) => (
        <Typography>{technologies?.find((tech) => tech.id === record.id)?.name}</Typography>
      ),
      width: "50%",
    },
    {
      title: t("CREATE_EMPLOYEE.LEVEL"),
      dataIndex: "level",
      key: "level",
      render: (_text: string, record: TechnicalMember) => record?.level,
      width: 200,
    },
    {
      title: t("CREATE_EMPLOYEE.EXPERIENCE"),
      dataIndex: "experience",
      key: "experience",
      render: (_text: string, record: TechnicalMember) => record?.experience,
      width: 200,
    },
    {
      title: t("CREATE_EMPLOYEE.ACTION"),
      key: "experience",
      render: (_text: string, record: TechnicalMember) => (
        <Button onClick={() => handleDeleteTechnical(record.key)}>
          <DeleteOutlined />
        </Button>
      ),
      width: 200,
    },
  ];

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: string[]) => {
    setLoading(true);
    const finalValues = { ...values, language: tableDataLanguage, technical: tableDataTechnical };
    try {
      await createUser(finalValues);
      notification.success({
        message: t("CREATE_EMPLOYEE.SUCCESS"),
        description: t("CREATE_EMPLOYEE.CREATE_SUCCESS"),
      });
      navigate("/employees");
      form.resetFields();
    } catch (error: unknown) {
      notification.error({
        message: t("CREATE_EMPLOYEE.FAIL"),
        description: t(`CREATE_EMPLOYEE.${(error as Error).message}`) as string,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Form form={form} name='employeeForm' onFinish={onFinish}>
          <section>
            <h1>{t("CREATE_EMPLOYEE.PROFILE")}</h1>
            <hr />

            <Row gutter={[8, 8]}>
              {/* FullName */}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.FULLNAME")}
                  name='fullName'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Input placeholder={t("CREATE_EMPLOYEE.FULLNAME")} />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.EMAIL")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  name='email'
                  rules={validator}
                >
                  <Input placeholder={t("CREATE_EMPLOYEE.EMAIL")} />
                </Form.Item>
              </Col>

              {/* Addess */}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.ADDRESS")}
                  name='address'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Input placeholder={t("CREATE_EMPLOYEE.ADDRESS")} />
                </Form.Item>
              </Col>

              {/* DOB */}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name='dayOfBirth'
                  label={t("CREATE_EMPLOYEE.DOB")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={(current) => current && current.isAfter(getEighteenYearsAgo())}
                    placeholder={t("CREATE_EMPLOYEE.DOB")}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.POSITIONS")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  name='positions'
                  rules={validator}
                >
                  <Select mode='multiple' placeholder={t("CREATE_EMPLOYEE.POSITIONS")}>
                    {positions?.map((position) => (
                      <Select.Option value={position.id}>{position.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Form.Item
                  label={t("CREATE_EMPLOYEE.MANAGER")}
                  name='isManager'
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Radio.Group onChange={handleProfileSelect}>
                    <Radio value={true}>{t("CREATE_EMPLOYEE.YES")}</Radio>
                    <Radio value={false}>{t("CREATE_EMPLOYEE.NO")}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12}>
                {managedByInputVisible && (
                  <Form.Item
                    label={t("CREATE_EMPLOYEE.MANAGED_BY")}
                    name='managerId'
                    labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                    wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                    rules={validator}
                  >
                    <Select placeholder={t("CREATE_EMPLOYEE.MANAGED_BY")}>
                      {users
                        ?.filter((user) => user.isManager)
                        .map((user) => (
                          <Select.Option key={user.id} value={user.id}>
                            {user.profile.fullName}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                )}
              </Col>

              {/* Des */}
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.DESCRIPTION")}
                  name='description'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Input.TextArea placeholder={t("CREATE_EMPLOYEE.DESCRIPTION")} />
                </Form.Item>
              </Col>
            </Row>
          </section>

          <section>
            <h1>{t("CREATE_EMPLOYEE.SKILL")}</h1>
            <hr />

            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Row gutter={[8, 8]}>
                  <Col span={24}>{t("CREATE_EMPLOYEE.LANGUAGE_FRAMEWORK")} :</Col>

                  <Col span={24} style={{ padding: "0", margin: "0" }}>
                    <Row gutter={[8, 8]}>
                      <Col span={12} style={{ paddingTop: "10px" }}>
                        <Col span={24} style={{ paddingBottom: "10px" }}>
                          <Select
                            placeholder={t("CREATE_EMPLOYEE.LANGUAGE_FRAMEWORK_SELECT")}
                            onChange={(value) => setLanguageMember(value)}
                            style={{ width: "100%" }}
                          >
                            {languages?.map((language) => (
                              <Select.Option value={language.id}>{language.name}</Select.Option>
                            ))}
                          </Select>
                        </Col>

                        <Col span={24} style={{ paddingBottom: "10px" }}>
                          <Input
                            type='number'
                            value={levelLanguage}
                            onChange={(e) => setLevelLanguage(e.target.value)}
                            placeholder={t("CREATE_EMPLOYEE.LEVEL_SELECT")}
                          />
                        </Col>

                        <Col span={24} style={{ paddingBottom: "10px" }}>
                          <Input
                            type='number'
                            value={experienceLanguage}
                            onChange={(e) => setExperienceLanguage(e.target.value)}
                            placeholder={t("CREATE_EMPLOYEE.EXPERIENCE_SELECT")}
                          />
                        </Col>

                        <Col span={24} style={{ paddingTop: "20px" }}>
                          <Button onClick={handleAddDataLanguage}>
                            {t("CREATE_EMPLOYEE.ADD")}
                          </Button>
                        </Col>
                      </Col>

                      <Col span={12}>
                        <Col span={24}>
                          <Table
                            dataSource={tableDataLanguage}
                            columns={columnsLanguage}
                            pagination={false}
                          />
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Row gutter={[8, 8]}>
                  <Col span={24}>{t("CREATE_EMPLOYEE.TECHNOLOGIES")} :</Col>

                  <Col span={24}>
                    <Row gutter={[8, 8]}>
                      <Col span={12} style={{ paddingTop: "10px" }}>
                        <Col span={24} style={{ paddingBottom: "10px" }}>
                          <Select
                            placeholder={t("CREATE_EMPLOYEE.TECHNICAL_SELECT")}
                            onChange={(value) => setTechnicalMember(value)}
                            style={{ width: "100%" }}
                          >
                            {technologies?.map((tech) => (
                              <Select.Option value={tech.id}>{tech.name}</Select.Option>
                            ))}
                          </Select>
                        </Col>
                        <Col span={24} style={{ paddingBottom: "10px" }}>
                          <Input
                            type='number'
                            value={levelTechnical}
                            onChange={(e) => setLevelTechnical(e.target.value)}
                            placeholder={t("CREATE_EMPLOYEE.LEVEL_SELECT")}
                          />
                        </Col>
                        <Col span={24} style={{ paddingBottom: "10px" }}>
                          <Input
                            type='number'
                            value={experienceTechnical}
                            onChange={(e) => setExperienceTechnical(e.target.value)}
                            placeholder={t("CREATE_EMPLOYEE.EXPERIENCE_SELECT")}
                          />
                        </Col>
                        <Col span={24} style={{ paddingTop: "20px" }}>
                          <Button onClick={handleAddDataTechnical}>
                            {t("CREATE_EMPLOYEE.ADD")}
                          </Button>
                        </Col>
                      </Col>

                      <Col span={12}>
                        <Col span={24}>
                          <Table
                            dataSource={tableDataTechnical}
                            columns={columnsTechnical}
                            pagination={false}
                          />
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </section>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {t("CREATE_EMPLOYEE.SUBMIT")}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default CreateEmployeeForm;
