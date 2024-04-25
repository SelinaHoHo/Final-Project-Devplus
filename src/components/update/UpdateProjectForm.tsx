/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetLanguage } from "@/hooks/useLanguage";
import { useUpdateProject } from "@/hooks/useProject";
import { useGetTechnical } from "@/hooks/useTechnical";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import { IProjectDetail } from "@/interfaces/project/projects.interface";
import { ProjectType, SkillType, UserType } from "@/interfaces/user/users.interface";
import { Button, Col, DatePicker, Form, Input, Row, Select, type FormProps } from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupSync } from "../../helpers/validation";
import "./updateProject.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

type DataProps = {
  data: IProjectDetail | undefined;
};

const { RangePicker } = DatePicker;
const { TextArea } = Input;
dayjs.extend(customParseFormat);

const UpdateProjectForm: FC<DataProps> = ({ data }) => {
  const { data: user } = useGetAllUserNoPagination();
  const { data: technical } = useGetTechnical();
  const { data: language } = useGetLanguage();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: updateProject, isPending } = useUpdateProject(data?.id as string);

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

  const initialValue = data
    ? {
        name: data?.name,
        description: data?.description,
        date: [
          dayjs(data?.startDate).tz("Asia/Ho_Chi_Minh"),
          dayjs(data?.endDate).tz("Asia/Ho_Chi_Minh"),
        ],
        technical: data?.technicalProject?.map((item: any) => item?.technical?.id),
        language: data?.languageProject?.map((item: any) => item?.language?.id),
        managerId: data?.user?.id,
      }
    : {};

  const onFinish: FormProps<ProjectType>["onFinish"] = (values) => {
    updateProject({
      id: data?.id as string,
      ...values,
      startDate: JSON.parse(JSON.stringify(values.date[0])),
      endDate: JSON.parse(JSON.stringify(values.date[1])),
    });
    setTimeout(() => {
      form.resetFields();
    }, 1000);
  };

  return (
    <>
      <Form onFinish={onFinish} form={form} initialValues={initialValue} id='updateProject'>
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
                format='DD/MM/YYYY'
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
                options={technical?.map((item: SkillType) => ({
                  key: item.id,
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
                  key: item.id,
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
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            loading={isPending}
            form='updateProject'
          >
            {t("UPDATE_PROJECT.SUBMIT")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProjectForm;
