import type { TableProps } from "antd";
import { Avatar, Card, Col, List, Row, Space, Steps, Table, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "./detailProject.scss";

interface DataType {
  key: string;
  name: string;
  email: string;
  roles: string[];
}

const { Title, Paragraph } = Typography;
const detailProject = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("DETAIL_PROJECT.TABLE_NAME"),
      dataIndex: "name",
      width: "30%",
      key: "name",
      render: (text) => (
        <>
          <List itemLayout='horizontal'>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ alignItems: "center", justifyContent: "center" }}
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                  />
                }
                title={<p style={{ margin: "7px 0" }}>{text}</p>}
              />
            </List.Item>
          </List>
        </>
      ),
    },
    {
      title: "Email",
      width: "30%",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <>
          <p>{text}</p>
        </>
      ),
    },
    {
      title: t("DETAIL_PROJECT.TABLE_ROLES"),
      dataIndex: "roles",
      key: "roles",
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            return (
              <Tag color={"#16c2c2"} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      email: "jxQ1j@example.com",
      roles: ["FE", "DevOps"],
    },
    {
      key: "2",
      name: "Jim Green",
      email: "jxQ1j@example.com",
      roles: ["BE", "DevOps"],
    },
    {
      key: "3",
      name: "Joe Black",
      email: "jxQ1j@example.com",
      roles: ["DA", "BA"],
    },
  ];
  return (
    <Row gutter={[16, 4]} style={{ width: "100%" }}>
      <Col md={24} lg={{ span: 16, flex: "column" }} style={{ width: "100%" }}>
        <Space direction='vertical'>
          <Card bordered type='inner'>
            <Row gutter={[8, 4]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Title level={5}>{t("DETAIL_PROJECT.DESCRIPTION")}</Title>
                <Paragraph>{t("DETAIL_PROJECT.DESCRIPTION_CONTENT")}</Paragraph>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Title level={5}>{t("DETAIL_PROJECT.STARTDATE")}</Title>
                <Paragraph>{t("DETAIL_PROJECT.STARTDATE_CONTENT")}</Paragraph>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Title level={5}>{t("DETAIL_PROJECT.ENDDATE")}</Title>
                <Paragraph>{t("DETAIL_PROJECT.ENDDATE_CONTENT")}</Paragraph>
              </Col>
            </Row>
          </Card>
          <Card bordered type='inner'>
            <Row gutter={[8, 4]}>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Title level={5}>{t("DETAIL_PROJECT.TECHNICAL")}</Title>
                <Paragraph>{t("DETAIL_PROJECT.TECHNICAL_CONTENT")}</Paragraph>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Title level={5}>{t("DETAIL_PROJECT.LANGUAGE")}</Title>
                <Paragraph>{t("DETAIL_PROJECT.LANGUAGE_CONTENT")}</Paragraph>
              </Col>
            </Row>
          </Card>
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
                              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                            />
                          }
                          title={
                            <p style={{ color: "#16c2c2", fontSize: "3vh", margin: "0" }}>
                              Manager name
                            </p>
                          }
                          description={
                            <p style={{ fontSize: "2vh", margin: "0" }}>Manager email</p>
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
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Table columns={columns} dataSource={data} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
      <Col md={24} lg={{ span: 8, flex: "column" }} style={{ width: "100%" }}>
        <Card style={{ height: "100%" }} bordered type='inner'>
          <Title level={5}>{t("DETAIL_PROJECT.TRACKING")}</Title>
          <Steps
            percent={60}
            direction='vertical'
            labelPlacement='vertical'
            current={1}
            items={[
              {
                title: "Pending",
              },
              {
                title: "In Progress",
              },
              {
                title: "Completed",
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default detailProject;
