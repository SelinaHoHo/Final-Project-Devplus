import { IUserDetail } from "@/interfaces/user/users.interface";
import { Avatar, Card, Col, Row, Space, Table, Typography } from "antd";
import moment from "moment";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "./DetailForm.scss";

type DataProps = {
  data: IUserDetail | undefined;
};

interface TechnicalMember {
  technical: {
    name: string;
  };
}

interface LanguageMember {
  language: {
    name: string;
  };
}

const { Text, Title } = Typography;

const DetailForm: FC<DataProps> = ({ data }) => {
  const { t } = useTranslation();
  const columnsLanguage = [
    {
      title: t("DETAIL_EMPLOYEE.LANGUAGE_FRAMEWORK"),
      dataIndex: "name",
      key: "name",
      width: 300,

      render: (_text: string, record: LanguageMember) => record.language.name,
    },
    {
      title: t("DETAIL_EMPLOYEE.LEVEL"),
      dataIndex: "level",
      key: "level",
      width: 100,
    },
    {
      title: t("DETAIL_EMPLOYEE.EXPERIENCE"),
      dataIndex: "experience",
      key: "experience",
      width: 100,
    },
  ];

  const columnsTechnical = [
    {
      title: t("DETAIL_EMPLOYEE.TECHNICAL"),
      dataIndex: "name",
      key: "name",
      width: 300,

      render: (_text: string, record: TechnicalMember) => record.technical.name,
    },
    {
      title: t("DETAIL_EMPLOYEE.LEVEL"),
      dataIndex: "level",
      key: "level",
      width: 100,
    },
    {
      title: t("DETAIL_EMPLOYEE.EXPERIENCE"),
      dataIndex: "experience",
      key: "experience",
      width: 100,
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ width: "100%" }}>
      <Col md={24} lg={{ span: 24, flex: "column" }} style={{ width: "100%" }}>
        <Space direction='vertical'>
          <Card bordered type='inner' style={{ padding: "20px" }}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Title level={2}>{t("DETAIL_EMPLOYEE.PROFILE")}</Title>
              </Col>
              <Col span={24}>
                <Row gutter={[24, 24]}>
                  <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <Avatar size={450} src={data?.profile.avatarUrl} />
                    </Col>
                  </Col>

                  <Col span={12}>
                    <Col>
                      <Text
                        style={{
                          color: "#16c2c2",
                          fontSize: "30px",
                          margin: "0",
                        }}
                      >
                        {data?.profile.fullName}
                      </Text>
                    </Col>

                    <Col>
                      <Text strong>
                        {data?.projectHistory.map((day) =>
                          moment(day.createDate).format("MM/YYYY"),
                        )}{" "}
                        - {t("DETAIL_EMPLOYEE.NOW")}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={{ fontSize: "16px", margin: "0", paddingTop: "10px" }}>
                        <Text strong>{t("DETAIL_EMPLOYEE.ADDRESS")}:</Text> {data?.profile.address}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={{ fontSize: "16px", margin: "0" }}>
                        <Text strong>{t("DETAIL_EMPLOYEE.EMAIL")}:</Text> {data?.email}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={{ fontSize: "16px" }}>
                        <Text strong style={{ fontSize: "18px" }}>
                          {t("DETAIL_EMPLOYEE.POSITION")}:{" "}
                        </Text>
                        {data?.positionMember.map((item) => item?.postion.name).join(", ")}
                      </Text>
                    </Col>

                    <Col span={24}>
                      <Table
                        dataSource={data?.languageMember}
                        columns={columnsLanguage}
                        pagination={false}
                        style={{ margin: "0" }}
                      />
                    </Col>

                    <Col>
                      <Table
                        dataSource={data?.technicalMember}
                        columns={columnsTechnical}
                        pagination={false}
                        style={{ margin: "0" }}
                      />
                    </Col>

                    <Col>
                      <Text>
                        {" "}
                        <Text strong style={{ fontSize: "18px" }}>
                          {t("DETAIL_EMPLOYEE.DESCRIPTION")}:{" "}
                        </Text>
                        {data?.profile?.description}
                      </Text>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {data?.projectMembers?.map((item, index) => (
            <Card bordered type='inner' style={{ padding: "20px" }}>
              <Col key={index} span={24}>
                <Title level={3}>
                  {item?.project.name} ({moment(item?.project.startDate).format("MM/YYYY")} -{" "}
                  {moment(item?.project.endDate).format("MM/YYYY")})
                </Title>
                <br />

                <Text style={{ fontSize: "16px" }}>
                  <Text strong style={{ fontSize: "18px" }}>
                    {t("DETAIL_EMPLOYEE.ROLE")}:{" "}
                  </Text>
                  {item?.roles?.length
                    ? item.roles.map((role) => role?.position?.name).join(", ")
                    : "Manager"}
                </Text>
                <br />

                <Text style={{ fontSize: "16px" }}>
                  <Text strong style={{ fontSize: "18px" }}>
                    {t("DETAIL_EMPLOYEE.LANGUAGE_FRAMEWORK")}:
                  </Text>{" "}
                  {item?.project?.languageProject?.map((lang) => lang?.language?.name).join(", ")}
                </Text>
                <br />

                <Text style={{ fontSize: "16px" }}>
                  <Text strong style={{ fontSize: "18px" }}>
                    {t("DETAIL_EMPLOYEE.TECHNICAL")}:
                  </Text>{" "}
                  {item?.project?.technicalProject?.map((tech) => tech?.technical?.name).join(", ")}
                </Text>
                <br />

                <Text style={{ fontSize: "16px" }}>
                  <Text strong style={{ fontSize: "18px" }}>
                    {t("DETAIL_EMPLOYEE.DESCRIPTION")}:
                  </Text>{" "}
                  {item?.project.description}
                </Text>
                <br />
                <hr />
              </Col>
            </Card>
          ))}
        </Space>
      </Col>
    </Row>
  );
};

export default DetailForm;
