/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupSync } from "@/helpers/validation";
import { useGetPosition } from "@/hooks/usePosition";
import { useAddEmployeeToProject, useUnAssignEmployee } from "@/hooks/useProject";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import {
  IAssignEmployee,
  IProjectDetail,
  ProjectMembers,
} from "@/interfaces/project/projects.interface";
import { SkillType, UserType } from "@/interfaces/user/users.interface";
import { UpdateAssignEmployee } from "@/pages/project/Update/UpdatAssignEmployee";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select, Table, message } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import "./updateProject.scss";

type DataProps = {
  data: IProjectDetail | undefined;
};

const UpdateEmployeeProject: FC<DataProps> = ({ data }) => {
  const { data: user } = useGetAllUserNoPagination();
  const { data: position } = useGetPosition();
  const { mutate: assignEmployee } = useAddEmployeeToProject();
  const { mutate: unassignEmployee } = useUnAssignEmployee();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const validator = [
    yupSync(
      Yup.object().shape({
        employeeId: Yup.string().required(t("UPDATE_PROJECT.EMPLOYEE_REQUIRED") as string),
        roles: Yup.array().required(t("UPDATE_PROJECT.ROLES_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];

  const handleActionDelete = (id: any) => {
    unassignEmployee(id);
  };
  const onFinish = (values: IAssignEmployee) => {
    // console.log(values);
    const exist = data?.projectMembers?.some((item: ProjectMembers) => {
      if (item?.user?.id === values.employeeId) {
        return true;
      }
    });
    if (exist) {
      messageApi.open({
        type: "error",
        content: t("CREATE_PROJECT.ALREADY_EXISTS"),
      });
    } else {
      assignEmployee({ ...values, projectId: data?.id as string });
      setTimeout(() => {
        form.resetFields();
      }, 1000);
    }
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish} form={form}>
        <Row gutter={[8, 4]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Row gutter={[8, 4]}>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name='employeeId'
                  label={t("CREATE_PROJECT.EMPLOYEE")}
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
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
                  rules={validator}
                >
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder={t("CREATE_PROJECT.EMPLOYEE_ROLES") as string}
                    notFoundContent={null}
                    options={position?.map((item: SkillType) => ({
                      key: item.id,
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item>
                  <Button type='dashed' htmlType='submit' block icon={<PlusOutlined />}>
                    {t("UPDATE_PROJECT.ADD_EMPLOYEE")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              className='table-assign-employee'
              label={t("DETAIL_PROJECT.EMPLOYEE")}
              labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
            >
              <Table<ProjectMembers>
                columns={UpdateAssignEmployee(handleActionDelete)}
                dataSource={data?.projectMembers}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UpdateEmployeeProject;
