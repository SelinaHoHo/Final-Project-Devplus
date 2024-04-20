import { useGetLangs } from "@/hooks/useLang";
import { useGetPosition } from "@/hooks/usePosition";
import { useGetTechs } from "@/hooks/useTech";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { RootState } from "@/redux/store";
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
  Typography,
} from "antd";
import { Rule } from "antd/es/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createUser } from "../../../apis/user.api";
import { yupSync } from "../../../helpers/validation";
import "./CreateUser.scss";
const { Title } = Typography;

const CreateUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { theme } = useSelector((state: RootState) => state.global);

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
        status: Yup.string()
          .oneOf(["Pending", "In Progress"], t("CREATE_EMPLOYEE.INVALID_STATUS") as string)
          .required(t("CREATE_EMPLOYEE.STATUS_REQUIRED") as string),
        dayOfBirth: Yup.date().required(t("CREATE_EMPLOYEE.DOB_REQUIRED") as string),
        description: Yup.string().required(t("CREATE_EMPLOYEE.DESCRIPTION_REQUIRED") as string),
        isManager: Yup.string().required(t("CREATE_EMPLOYEE.IS_MANAGER_REQUIRED") as string),
        managedBy: Yup.string().required(t("CREATE_EMPLOYEE.MANAGED_BY_REQUIRED") as string),
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

  const onFinish = async (values: string[]) => {
    try {
      await createUser(values);
      notification.success({
        message: "Success",
        description: "Successfully created employee",
      });
      navigate("/employees");
    } catch (error) {
      alert(error);
      notification.error({
        message: "Error",
        description: "Error",
      });
    }
  };

  return (
    <div className='page-create-employee'>
      <Title level={2}>{t("CREATE_EMPLOYEE.CREATE_EMPLOYEE")}</Title>
      {theme === "dark" ? (
        <Form className='form-create-dark' form={form} name='employeeForm' onFinish={onFinish}>
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

              {/* Des */}
              <Col xs={24} sm={24} md={24} lg={12}>
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

              <Col xs={24} sm={24} md={24} lg={6}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.MANAGER")}
                  name='isManager'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Radio.Group onChange={handleProfileSelect}>
                    <Radio value={true}>{t("CREATE_EMPLOYEE.YES")}</Radio>
                    <Radio value={false}>{t("CREATE_EMPLOYEE.NO")}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={6}>
                {managedByInputVisible && (
                  <Form.Item
                    label={t("CREATE_EMPLOYEE.MANAGED_BY")}
                    name='managedBy'
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
            </Row>
          </section>

          <section>
            <h1>{t("CREATE_EMPLOYEE.SKILL")}</h1>
            <hr />

            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  name='language'
                  rules={validator}
                >
                  <Select mode='multiple' placeholder={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}>
                    {languages?.map((language) => (
                      <Select.Option key={language.id} value={language.id}>
                        {language.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.TECHNOLOGIES")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  name='technical'
                  rules={validator}
                >
                  <Select mode='multiple' placeholder={t("CREATE_EMPLOYEE.TECHNOLOGIES")}>
                    {technologies?.map((technology) => (
                      <Select.Option value={technology.id}>{technology.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
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
            </Row>
          </section>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {t("CREATE_EMPLOYEE.SUBMIT")}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form className='form-create-light' form={form} name='employeeForm' onFinish={onFinish}>
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

              {/* Status */}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.STATUS")}
                  name='status'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Select placeholder={t("CREATE_EMPLOYEE.STATUS")}>
                    <Select.Option value='Pending'>{t("CREATE_EMPLOYEE.PENDING")}</Select.Option>
                    <Select.Option value='In Progress'>
                      {t("CREATE_EMPLOYEE.IN_PROGRESS")}
                    </Select.Option>
                  </Select>
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
                    disabledDate={(current) => current && current.isAfter(Date.now())}
                    placeholder={t("CREATE_EMPLOYEE.DOB")}
                  />
                </Form.Item>
              </Col>

              {/* Des */}
              <Col xs={24} sm={24} md={24} lg={12}>
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

              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.MANAGER")}
                  name='isManager'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
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
                    name='managedBy'
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
            </Row>
          </section>

          <section>
            <h1>{t("CREATE_EMPLOYEE.SKILL")}</h1>
            <hr />

            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  name='language'
                  rules={validator}
                >
                  <Select mode='multiple' placeholder={t("CREATE_EMPLOYEE.CODING_LANGUAGE")}>
                    {languages?.map((language) => (
                      <Select.Option key={language.id} value={language.id}>
                        {language.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label={t("CREATE_EMPLOYEE.TECHNOLOGIES")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  name='technical'
                  rules={validator}
                >
                  <Select mode='multiple' placeholder={t("CREATE_EMPLOYEE.TECHNOLOGIES")}>
                    {technologies?.map((technology) => (
                      <Select.Option value={technology.id}>{technology.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
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

export default CreateUser;
