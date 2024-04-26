/* eslint-disable @typescript-eslint/no-explicit-any */
import Spin from "@/components/core/Spin";
import { yupSync } from "@/helpers/validation";
import { useGetPosition } from "@/hooks/usePosition";
import {
  useGetAllUserNoPagination,
  useGetUserById,
  useUpdateUser,
  useUploadAvatar,
} from "@/hooks/useUser";
import { IUpdateUser } from "@/interfaces/user/users.interface";
import { setEmployeeDetailName } from "@/redux/features/tagView/tagViewSlice";
import { RootState } from "@/redux/store";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import LanguageFormTable from "./UpdateLanguageTable";
import UpdateTechnicalTable from "./UpdateTechnicalTable";
import "./UpdateUser.scss";

const UpdateUser = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: dataDetail, isLoading: isLoadingGetAll } = useGetUserById(id ?? "");
  const [form] = Form.useForm();
  const { data: positions } = useGetPosition();
  const { data: users } = useGetAllUserNoPagination();
  const { mutate: uploadAvatar, isPending, data: dataURL } = useUploadAvatar();
  const { mutate: postUser } = useUpdateUser(id ?? "");
  const [URLImg, setURLImg] = useState("");

  const getEighteenYearsAgo = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return eighteenYearsAgo;
  };

  if (dataDetail) {
    dispatch(setEmployeeDetailName(dataDetail.profile.fullName));
  }

  const validator = [
    yupSync(
      Yup.object().shape({
        fullName: Yup.string().required(t("UPDATE_EMPLOYEE.NAME_REQUIRED") as string),
        email: Yup.string()
          .email(t("UPDATE_EMPLOYEE.INVALIDEMAIL_REQUIRED") as string)
          .required(t("UPDATE_EMPLOYEE.EMAIL_REQUIRED") as string),
        address: Yup.string().required(t("UPDATE_EMPLOYEE.ADDRESS_REQUIRED") as string),
        status: Yup.string()
          .oneOf(["Active", "Disable"], t("UPDATE_EMPLOYEE.INVALID_STATUS") as string)
          .required(t("UPDATE_EMPLOYEE.STATUS_REQUIRED") as string),
        dayOfBirth: Yup.date().required(t("UPDATE_EMPLOYEE.DOB_REQUIRED") as string),
        description: Yup.string().required(t("UPDATE_EMPLOYEE.DESCRIPTION_REQUIRED") as string),
        isManager: Yup.string().required(t("UPDATE_EMPLOYEE.IS_MANAGER_REQUIRED") as string),
        managerId: Yup.string().required(t("UPDATE_EMPLOYEE.MANAGED_BY_REQUIRED") as string),
        languageMember: Yup.array().required(t("UPDATE_EMPLOYEE.LANGUAGE_REQUIRED") as string),
        technicalMember: Yup.array().required(t("UPDATE_EMPLOYEE.TECHNICAL_REQUIRED") as string),
        positions: Yup.array().required(t("UPDATE_EMPLOYEE.POSITIONS_REQUIRED") as string),
        avatarUrl: Yup.string().required(t("UPDATE_EMPLOYEE.AVATAR_REQUIRED") as string),
        experience: Yup.number()
          .typeError(t("UPDATE_EMPLOYEE.EXPERIENCE_REQUIRED") as string)
          .positive(t("UPDATE_EMPLOYEE.EXPERIENCE_POSITIVE") as string)
          .integer(t("UPDATE_EMPLOYEE.EXPERIENCE_INTEGER") as string)
          .required(t("UPDATE_EMPLOYEE.EXPERIENCE_REQUIRED") as string),
        level: Yup.number()
          .typeError(t("UPDATE_EMPLOYEE.LEVEL_REQUIRED") as string)
          .positive(t("UPDATE_EMPLOYEE.LEVEL_POSITIVE") as string)
          .integer(t("UPDATE_EMPLOYEE.LEVEL_INTEGER") as string)
          .required(t("UPDATE_EMPLOYEE.LEVEL_REQUIRED") as string),
      }),
    ),
  ] as unknown as Rule[];
  const [managedByInputVisible, setManagedByInputVisible] = useState(false);

  const handleProfileSelect = (e: RadioChangeEvent) => {
    setManagedByInputVisible(e.target.value === false);
  };
  const dateFormat = "YYYY/MM/DD";
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const initialValue = dataDetail
    ? {
        fullName: dataDetail?.profile.fullName,
        email: dataDetail?.email,
        dayOfBirth: [dayjs(dataDetail?.profile?.dayOfBirth, dateFormat)],
        technicalMember: dataDetail?.technicalMember?.map((item) => item?.technical?.id),
        languageMember: dataDetail?.languageMember?.map((item) => item?.language?.id),
        description: dataDetail?.profile?.description,
        isManager: dataDetail?.isManager,
        managerId: dataDetail?.managerId,
        address: dataDetail?.profile?.address,
        avatarUrl: dataDetail?.profile?.avatarUrl,
        positions: dataDetail?.positionMember?.map((item) => item?.postion?.id),
        experience: dataDetail?.languageMember?.map((item) => item?.experience),
        level: dataDetail?.languageMember?.map((item) => item?.level),
      }
    : {};

  useEffect(() => {
    if (dataDetail?.profile?.avatarUrl) {
      setImageUrl(dataDetail.profile.avatarUrl);
    }
    if (initialValue.isManager === false) {
      setManagedByInputVisible(true);
    }
  }, [dataDetail, initialValue.isManager]);

  useEffect(() => {
    if (dataURL) setURLImg(dataURL.url ?? "");
  }, [dataURL]);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const result = reader.result;
      if (typeof result === "string") {
        callback(result);
      }
    });
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const [imageUrl, setImageUrl] = useState<string>(dataDetail?.profile?.avatarUrl || "");

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  useEffect(() => {
    if (imageUrl) {
      setFileList([
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: imageUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [imageUrl]);

  const handleChange: UploadProps["onChange"] = (info) => {
    getBase64(info.file.originFileObj as FileType, (customRequest) => {
      setImageUrl(customRequest);
    });
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    form.setFieldsValue({ avatarUrl: "" });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      await getBase64(file.originFileObj as FileType, (preview: string) => {
        file.preview = preview;
      });
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const customRequesta = async (option: any) => {
    const formData = new FormData();
    Promise.all([formData.append("file", option.file), await uploadAvatar(formData)]);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type='button'>
      {isPending ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinishUpdateUser = (values: IUpdateUser) => {
    const formatValue = {
      ...values,
      dayOfBirth: dayjs(values.dayOfBirth).format(),
      avatarUrl: URLImg,
    };
    postUser(formatValue);
  };

  return !isLoadingGetAll ? (
    <div className='update-employee'>
      <section className={theme === "dark" ? "dark" : "light"}>
        <h1>{t("UPDATE_EMPLOYEE.PROFILE")}</h1>
        <hr />
        <Form
          form={form}
          name='employeeForm'
          onFinish={onFinishUpdateUser}
          initialValues={initialValue}
        >
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.AVATAR")}
                name='avatarUrl'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
              >
                <Upload
                  name='avatarUrl'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={{ showRemoveIcon: true }}
                  onRemove={handleRemoveImage}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  customRequest={customRequesta}
                  fileList={fileList}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    width={300}
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            </Col>
            {/* FullName */}
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.FULLNAME")}
                name='fullName'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <Input placeholder={t("UPDATE_EMPLOYEE.FULLNAME")} />
              </Form.Item>
            </Col>

            {/* Email */}
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.EMAIL")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='email'
                rules={validator}
              >
                <Input disabled placeholder={t("UPDATE_EMPLOYEE.EMAIL")} />
              </Form.Item>
            </Col>

            {/* Addess */}
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.ADDRESS")}
                name='address'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <Input placeholder={t("UPDATE_EMPLOYEE.ADDRESS")} />
              </Form.Item>
            </Col>

            {/* DOB */}
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name='dayOfBirth'
                label={t("UPDATE_EMPLOYEE.DOB")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) => current && current.isAfter(getEighteenYearsAgo())}
                  placeholder={t("UPDATE_EMPLOYEE.DOB")}
                />
              </Form.Item>
            </Col>

            {/* Des */}
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.DESCRIPTION")}
                name='description'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <Input.TextArea placeholder={t("UPDATE_EMPLOYEE.DESCRIPTION")} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.POSITIONS")}
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                name='positions'
                rules={validator}
              >
                <Select mode='multiple' placeholder={t("UPDATE_EMPLOYEE.POSITIONS")}>
                  {positions?.map((position) => (
                    <Select.Option value={position.id}>{position.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6}>
              <Form.Item
                label={t("UPDATE_EMPLOYEE.MANAGER")}
                name='isManager'
                labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                rules={validator}
              >
                <Radio.Group onChange={handleProfileSelect}>
                  <Radio value={true}>{t("UPDATE_EMPLOYEE.YES")}</Radio>
                  <Radio value={false}>{t("UPDATE_EMPLOYEE.NO")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6}>
              {managedByInputVisible && (
                <Form.Item
                  label={t("UPDATE_EMPLOYEE.MANAGED_BY")}
                  name='managerId'
                  labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                  rules={validator}
                >
                  <Select placeholder={t("UPDATE_EMPLOYEE.MANAGED_BY")}>
                    {users
                      ?.filter((user) => user.isManager)
                      .map((user) => (
                        <Select.Option value={user.id}>{user.profile.fullName}</Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              )}
            </Col>
          </Row>
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={isPending}>
              {t("UPDATE_EMPLOYEE.SUBMIT")}
            </Button>
          </Form.Item>
        </Form>
      </section>

      <section className={theme === "dark" ? "dark" : "light"}>
        <h1>{t("UPDATE_EMPLOYEE.SKILL")}</h1>
        <hr />

        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <LanguageFormTable dataSource={dataDetail?.languageMember ?? []} />
          </Col>

          <Col xs={24} sm={24} md={24} lg={24}>
            <UpdateTechnicalTable dataSourceT={dataDetail?.technicalMember ?? []} />
          </Col>
        </Row>
      </section>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <Spin />
    </div>
  );
};

export default UpdateUser;
