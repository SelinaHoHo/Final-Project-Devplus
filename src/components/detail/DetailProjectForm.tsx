import { IProjectDetail, ProjectMembers } from "@/interfaces/project/projects.interface";
import { EmployeeProjectsColumnsTable } from "@/pages/project/Detail/DetailColumn";
import { RootState } from "@/redux/store";
import { Avatar, Card, Col, List, Row, Space, Table, Typography } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./detailProject.scss";
import Tracking from "../Tracking/Tracking";

type DataProps = {
  data: IProjectDetail | undefined;
};

const { Title, Paragraph } = Typography;
const DetailProjectForm: FC<DataProps> = ({ data }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.global);
  const formattedDate = (date: string | Date) => {
    const formatted = new Date(date);
    return `${formatted.getFullYear()}-${(formatted.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${formatted.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {theme === "dark" ? (
        <div className='detail-project-dark'>
          <Row gutter={[16, 4]} style={{ width: "100%" }}>
            <Col md={24} lg={{ span: 16, flex: "column" }} style={{ width: "100%" }}>
              <Space direction='vertical'>
                <Card bordered type='inner'>
                  <Row gutter={[8, 4]}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.STARTDATE")}</Title>
                      <Paragraph>{formattedDate(data?.startDate || new Date())}</Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.ENDDATE")}</Title>
                      <Paragraph>{formattedDate(data?.endDate || new Date())}</Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.TECHNICAL")}</Title>
                      <Paragraph>
                        {data?.technicalProject.map((item) => item.technical.name).join(", ")}
                      </Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.LANGUAGE")}</Title>
                      <Paragraph>
                        {data?.languageProject.map((item) => item.language.name).join(", ")}
                      </Paragraph>
                    </Col>
                  </Row>
                </Card>
                {data?.description !== null && (
                  <Card bordered type='inner'>
                    <Row gutter={[8, 4]}>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Title level={5}>{t("DETAIL_PROJECT.DESCRIPTION")}</Title>
                        <Paragraph>{data?.description}</Paragraph>
                      </Col>
                    </Row>
                  </Card>
                )}
                <Card bordered type='inner'>
                  <Row gutter={[8, 4]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Title level={5}>{t("DETAIL_PROJECT.MANAGER")}</Title>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <List itemLayout='horizontal'>
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    style={{ alignItems: "center", justifyContent: "center" }}
                                    size={64}
                                    src={data?.user?.profile?.avatarUrl}
                                  />
                                }
                                title={
                                  <p style={{ color: "#16c2c2", fontSize: "3vh", margin: "0" }}>
                                    {data?.user?.profile?.fullName}
                                  </p>
                                }
                                description={
                                  <p style={{ fontSize: "2vh", margin: "0" }}>
                                    {data?.user?.email}
                                  </p>
                                }
                              />
                            </List.Item>
                          </List>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
                <Card bordered type='inner'>
                  <Row gutter={[8, 4]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Title level={5}>{t("DETAIL_PROJECT.EMPLOYEE")}</Title>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} className='table-assign-employee'>
                          <Table<ProjectMembers>
                            columns={EmployeeProjectsColumnsTable()}
                            dataSource={data?.projectMembers}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Space>
            </Col>
            <Col md={24} lg={{ span: 8, flex: "column" }} style={{ width: "100%" }}>
              <Card style={{ height: "100%" }} bordered type='inner'>
                <Tracking data={data} />
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <div className='detail-project-light'>
          <Row gutter={[16, 4]} style={{ width: "100%" }}>
            <Col md={24} lg={{ span: 16, flex: "column" }} style={{ width: "100%" }}>
              <Space direction='vertical'>
                <Card bordered type='inner'>
                  <Row gutter={[8, 4]}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.STARTDATE")}</Title>
                      <Paragraph>{formattedDate(data?.startDate || new Date())}</Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.ENDDATE")}</Title>
                      <Paragraph>{formattedDate(data?.endDate || new Date())}</Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.TECHNICAL")}</Title>
                      <Paragraph>
                        {data?.technicalProject.map((item) => item.technical.name).join(", ")}
                      </Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Title level={5}>{t("DETAIL_PROJECT.LANGUAGE")}</Title>
                      <Paragraph>
                        {data?.languageProject.map((item) => item.language.name).join(", ")}
                      </Paragraph>
                    </Col>
                  </Row>
                </Card>
                {data?.description !== null && (
                  <Card bordered type='inner'>
                    <Row gutter={[8, 4]}>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Title level={5}>{t("DETAIL_PROJECT.DESCRIPTION")}</Title>
                        <Paragraph>{data?.description}</Paragraph>
                      </Col>
                    </Row>
                  </Card>
                )}
                <Card bordered type='inner'>
                  <Row gutter={[8, 4]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Title level={5}>{t("DETAIL_PROJECT.MANAGER")}</Title>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <List itemLayout='horizontal'>
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    style={{ alignItems: "center", justifyContent: "center" }}
                                    size={64}
                                    src={data?.user?.profile?.avatarUrl}
                                  />
                                }
                                title={
                                  <p style={{ color: "#16c2c2", fontSize: "3vh", margin: "0" }}>
                                    {data?.user?.profile?.fullName}
                                  </p>
                                }
                                description={
                                  <p style={{ fontSize: "2vh", margin: "0" }}>
                                    {data?.user?.email}
                                  </p>
                                }
                              />
                            </List.Item>
                          </List>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
                <Card bordered type='inner'>
                  <Row gutter={[8, 4]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Title level={5}>{t("DETAIL_PROJECT.EMPLOYEE")}</Title>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} className='table-assign-employee'>
                          <Table<ProjectMembers>
                            columns={EmployeeProjectsColumnsTable()}
                            dataSource={data?.projectMembers}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Space>
            </Col>
            <Col md={24} lg={{ span: 8, flex: "column" }} style={{ width: "100%" }}>
              <Card style={{ height: "100%" }} bordered type='inner'>
                <Tracking data={data} />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DetailProjectForm;
