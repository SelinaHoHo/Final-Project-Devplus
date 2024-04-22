import { Avatar, Card, Col, Descriptions, List, Row, Space, Typography } from "antd";
import "./EmployeeDetailForm.scss";

const { Title } = Typography;
const EmployeeDetail = () => {
  return (
    <Row gutter={[16, 4]} style={{ width: "100%" }}>
      <Col md={24} lg={{ span: 24, flex: "column" }} style={{ width: "100%" }}>
        <Space direction='vertical'>
          <Card bordered type='inner'>
            <Row gutter={[8, 4]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Title level={5}>Profile</Title>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <List itemLayout='horizontal'>
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{ alignItems: "center", justifyContent: "center" }}
                              size={64}
                              src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                            />
                          }
                          title={
                            <p style={{ color: "#16c2c2", fontSize: "3vh", margin: "0" }}>
                              Full Name
                            </p>
                          }
                        />
                      </List.Item>
                      <Descriptions column={2}>
                        <Descriptions.Item label='Phone Number'>123456789</Descriptions.Item>
                        <Descriptions.Item label='Email'>abc@gmail.com</Descriptions.Item>
                        <Descriptions.Item label='Date of Birth'>12/12/12</Descriptions.Item>
                        <Descriptions.Item label='CID'>123</Descriptions.Item>
                        <Descriptions.Item label='Gender'>Male</Descriptions.Item>
                        <Descriptions.Item label='Status'>Active</Descriptions.Item>
                        <Descriptions.Item label='Skills'>Skill</Descriptions.Item>
                        <Descriptions.Item label='Position'>Position</Descriptions.Item>
                        <Descriptions.Item label='Department'>Department</Descriptions.Item>
                        <Descriptions.Item label='Start Date'>Start Date</Descriptions.Item>
                      </Descriptions>
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
                    <Title level={5}>Project</Title>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <List itemLayout='horizontal'>
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{ alignItems: "center", justifyContent: "center" }}
                              size={64}
                              src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                            />
                          }
                          title={
                            <p style={{ color: "#16c2c2", fontSize: "3vh", margin: "0" }}>
                              Full Name
                            </p>
                          }
                          description={<p style={{ fontSize: "2vh", margin: "0" }}>Email</p>}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{ alignItems: "center", justifyContent: "center" }}
                              size={64}
                              src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                            />
                          }
                          title={
                            <p
                              style={{
                                color: "#16c2c2",
                                fontSize: "3vh",
                                margin: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              Full Name
                            </p>
                          }
                          description={<p style={{ fontSize: "2vh", margin: "0" }}>Email</p>}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{ alignItems: "center", justifyContent: "center" }}
                              size={64}
                              src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                            />
                          }
                          title={
                            <p style={{ color: "#16c2c2", fontSize: "3vh", margin: "0" }}>
                              Full Name
                            </p>
                          }
                          description={<p style={{ fontSize: "2vh", margin: "0" }}>Email</p>}
                        />
                      </List.Item>
                    </List>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default EmployeeDetail;
