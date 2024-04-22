/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetLanguage } from "@/hooks/useLanguage";
import { useGetPosition } from "@/hooks/usePosition";
import { useGetTechnical } from "@/hooks/useTechnical";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { IProjectDetail, ProjectMembers } from "@/interfaces/project/projects.interface";
import { ProjectType, SkillType, UserType } from "@/interfaces/user/users.interface";
import { UpdateAssignEmployee } from "@/pages/project/Update/UpdatAssignEmployee";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, Table, type FormProps } from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupSync } from "../../helpers/validation";
import "./updateProject.scss";

type DataProps = {
  data: IProjectDetail | undefined;
};

const { RangePicker } = DatePicker;
const { TextArea } = Input;
dayjs.extend(customParseFormat);

const UpdateProjectForm: FC<DataProps> = ({ data }) => {
  // console.log(data);
  const { data: user } = useGetAllUserNoPagination();
  const { data: technical } = useGetTechnical();
  const { data: language } = useGetLanguage();
  const { data: position } = useGetPosition();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  //   const { mutate: updateProject } = useUpdateProject(id);
  //   const [messageApi, contextHolder] = message.useMessage();

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

  const initialValue = {
    name: data?.name,
    description: data?.description,
    // date: [data?.startDate, data?.endDate],
    technical: data?.technicalProject?.map((item: any) => item?.technical.name),
    language: data?.languageProject?.map((item: any) => item?.language.name),
    managerId: data?.user?.profile?.fullName,
  };

  const onFinish: FormProps<ProjectType>["onFinish"] = () => {
    // console.log(values);
    // updateProject({
    //   ...values,
    //   startDate: JSON.parse(JSON.stringify(values.date[0])),
    //   endDate: JSON.parse(JSON.stringify(values.date[1])),
    // });
    setTimeout(() => {
      form.resetFields();
    }, 1000);
  };

  return (
    <>
      {/* {contextHolder} */}
      <Form onFinish={onFinish} form={form} initialValues={initialValue} id='prj'>
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
          <Col xs={24} sm={24} md={24} lg={12}>
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
                  >
                    {user?.map(
                      (item: UserType) =>
                        !item.isManager && (
                          <Select.Option key={item?.id} value={item?.id}>
                            {item?.profile?.fullName}
                          </Select.Option>
                        ),
                    ) || []}
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
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item>
                  <Button type='dashed' block icon={<PlusOutlined />}>
                    {t("CREATE_PROJECT.CREATE_EMPLOYEE")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              label={t("DETAIL_PROJECT.EMPLOYEE")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            >
              <Table<ProjectMembers>
                columns={UpdateAssignEmployee()}
                dataSource={data?.projectMembers}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item<ProjectType>
              name='description'
              label={t("CREATE_PROJECT.DESCRIPTION")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            >
              <TextArea
                defaultValue={data?.description}
                placeholder={t("CREATE_PROJECT.DESCRIPTIONDES")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type='primary' size='large' htmlType='submit' form='prj'>
            {t("UPDATE_PROJECT.SUBMIT")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProjectForm;
