import { IUserDetail } from "@/interfaces/user/users.interface";
import { RootState } from "@/redux/store";
import { Avatar, Card, Col, Row, Steps, Table, Typography } from "antd";
import moment from "moment";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./DetailForm.scss";

const { Step } = Steps;

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
  const { theme } = useSelector((state: RootState) => state.global);
  const columnsLanguage = [
    {
      title: t("DETAIL_EMPLOYEE.LANGUAGE_FRAMEWORK"),
      dataIndex: "name",
      key: "name",
      width: 300,

      render: (_text: string, record: LanguageMember) => record?.language?.name,
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
    <div>
      {theme === "dark" ? (
        <div className='detail-employee-dark'>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Col span={24}>
                <Card bordered type='inner' style={{ padding: "10px" }}>
                  <Row gutter={[8, 8]}>
                    <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                      <Title level={2}>{t("DETAIL_EMPLOYEE.PROFILE")}</Title>
                    </Col>

                    <Col span={24}>
                      <Row gutter={[24, 24]}>
                        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                          <Avatar size={200} src={data?.profile.avatarUrl} />
                        </Col>

                        <Col span={24}>
                          <Col>
                            <Text
                              style={{
                                color: "#16c2c2",
                                fontSize: "30px",
                                margin: "0",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {data?.profile.fullName}
                            </Text>
                          </Col>

                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingBottom: "30px",
                            }}
                          >
                            <Text strong>
                              {moment(data?.created_at).format("MM/YYYY")} -{" "}
                              {t("DETAIL_EMPLOYEE.NOW")}
                            </Text>
                          </Col>

                          <Col>
                            <Text style={{ fontSize: "16px", margin: "0", paddingTop: "10px" }}>
                              <Text strong>{t("DETAIL_EMPLOYEE.ADDRESS")}:</Text>{" "}
                              {data?.profile.address}
                            </Text>
                          </Col>

                          <Col>
                            <Text style={{ fontSize: "16px", margin: "0" }}>
                              <Text strong>{t("DETAIL_EMPLOYEE.EMAIL")}:</Text> {data?.email}
                            </Text>
                          </Col>

                          <Col>
                            <Text style={{ fontSize: "16px" }}>
                              <Text strong>{t("DETAIL_EMPLOYEE.POSITION")}: </Text>
                              {data?.positionMember.map((item) => item?.postion.name).join(", ")}
                            </Text>
                          </Col>

                          <Col span={24} style={{ paddingTop: "10px" }}>
                            <Table
                              dataSource={data?.languageMember}
                              columns={columnsLanguage}
                              pagination={false}
                              style={{ margin: "0" }}
                            />
                          </Col>

                          <Col span={24} style={{ paddingTop: "10px" }}>
                            <Table
                              dataSource={data?.technicalMember}
                              columns={columnsTechnical}
                              pagination={false}
                              style={{ margin: "0" }}
                            />
                          </Col>

                          <Col style={{ paddingTop: "20px" }}>
                            <Text>
                              <Text strong style={{ fontSize: "16px" }}>
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
              </Col>
            </Col>

            <Col span={12}>
              {data?.projectMembers?.map((item, index) => (
                <Card bordered type='inner' style={{ padding: "20px" }}>
                  <Col key={index} span={24}>
                    <Title level={1} style={{ display: "flex", justifyContent: "center" }}>
                      {item?.project.name}
                    </Title>
                    <br />

                    <Steps direction='horizontal' size='small'>
                      <Step title={moment(item?.project.startDate).format("DD/MM/YYYY")} />
                      <Step
                        title={moment(item?.project.endDate).format("DD/MM/YYYY")}
                        status='finish'
                      />
                    </Steps>
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
                      {item?.project?.languageProject
                        ?.map((lang) => lang?.language?.name)
                        .join(", ")}
                    </Text>
                    <br />

                    <Text style={{ fontSize: "16px" }}>
                      <Text strong style={{ fontSize: "18px" }}>
                        {t("DETAIL_EMPLOYEE.TECHNICAL")}:
                      </Text>{" "}
                      {item?.project?.technicalProject
                        ?.map((tech) => tech?.technical?.name)
                        .join(", ")}
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
            </Col>
          </Row>
        </div>
      ) : (
        <div className='detail-employee-light'>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Col span={24}>
                <Card bordered type='inner' style={{ padding: "10px" }}>
                  <Row gutter={[8, 8]}>
                    <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                      <Title level={2}>{t("DETAIL_EMPLOYEE.PROFILE")}</Title>
                    </Col>

                    <Col span={24}>
                      <Row gutter={[24, 24]}>
                        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                          <Avatar size={200} src={data?.profile.avatarUrl} />
                        </Col>

                        <Col span={24}>
                          <Col>
                            <Text
                              style={{
                                color: "#16c2c2",
                                fontSize: "30px",
                                margin: "0",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {data?.profile.fullName}
                            </Text>
                          </Col>

                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingBottom: "30px",
                            }}
                          >
                            <Text strong>
                              {moment(data?.created_at).format("MM/YYYY")} -{" "}
                              {t("DETAIL_EMPLOYEE.NOW")}
                            </Text>
                          </Col>

                          <Col>
                            <Text style={{ fontSize: "16px", margin: "0", paddingTop: "10px" }}>
                              <Text strong>{t("DETAIL_EMPLOYEE.ADDRESS")}:</Text>{" "}
                              {data?.profile.address}
                            </Text>
                          </Col>

                          <Col>
                            <Text style={{ fontSize: "16px", margin: "0" }}>
                              <Text strong>{t("DETAIL_EMPLOYEE.EMAIL")}:</Text> {data?.email}
                            </Text>
                          </Col>

                          <Col>
                            <Text style={{ fontSize: "16px" }}>
                              <Text strong>{t("DETAIL_EMPLOYEE.POSITION")}: </Text>
                              {data?.positionMember.map((item) => item?.postion.name).join(", ")}
                            </Text>
                          </Col>

                          <Col span={24} style={{ paddingTop: "10px" }}>
                            <Table
                              dataSource={data?.languageMember}
                              columns={columnsLanguage}
                              pagination={false}
                              style={{ margin: "0" }}
                            />
                          </Col>

                          <Col span={24} style={{ paddingTop: "10px" }}>
                            <Table
                              dataSource={data?.technicalMember}
                              columns={columnsTechnical}
                              pagination={false}
                              style={{ margin: "0" }}
                            />
                          </Col>

                          <Col style={{ paddingTop: "20px" }}>
                            <Text>
                              <Text strong style={{ fontSize: "16px" }}>
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
              </Col>
            </Col>

            <Col span={12}>
              {data?.projectMembers?.length ?? 0 > 0 ? (
                data?.projectMembers?.map((item, index) => (
                  <Card bordered type='inner' style={{ padding: "20px" }}>
                    <Col key={index} span={24}>
                      <Title level={1} style={{ display: "flex", justifyContent: "center" }}>
                        {item?.project.name}
                      </Title>
                      <br />

                      <Steps direction='horizontal' size='small'>
                        <Step title={moment(item?.project.startDate).format("DD/MM/YYYY")} />
                        <Step
                          title={moment(item?.project.endDate).format("DD/MM/YYYY")}
                          status='finish'
                        />
                      </Steps>
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
                        {item?.project?.languageProject
                          ?.map((lang) => lang?.language?.name)
                          .join(", ")}
                      </Text>
                      <br />

                      <Text style={{ fontSize: "16px" }}>
                        <Text strong style={{ fontSize: "18px" }}>
                          {t("DETAIL_EMPLOYEE.TECHNICAL")}:
                        </Text>{" "}
                        {item?.project?.technicalProject
                          ?.map((tech) => tech?.technical?.name)
                          .join(", ")}
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
                ))
              ) : (
                <Card bordered type='inner' style={{ padding: "20px" }}>
                  <Title> {t("DETAIL_EMPLOYEE.PROJECTS")}</Title>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DetailForm;
