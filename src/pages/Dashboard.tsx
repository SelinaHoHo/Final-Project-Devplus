import { Col, Row, Timeline, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Translation } from "react-i18next";

const Dashboard = () => {
  const timeProject = {
    start: "11-11-2024",
    end: "11-12-2025",
  };

  const timelineData = [
    {
      label: "2024-09-01",
      children: "Obama",
      type: "out",
    },
    {
      label: "2024-09-01 09:12:11",
      children: "Donald Trump",
      type: "in",
    },
    {
      label: "2024-09-01 11:12:11",
      children: "Donald Trump",
      type: "out",
    },
    {
      label: "2024-09-01 09:20:00",
      children: "Joe Biden",
      type: "in",
    },
    {
      label: "2024-09-01 09:20:00",
      children: "Joe Biden",
      type: "out",
    },
    {
      label: "2024-09-01 12:05:00",
      children: "Donald Trump",
      type: "in",
    },
  ];

  return (
    <>
      <Row gutter={[16, 4]} style={{ width: "100%" }}>
        <Col md={24} lg={{ span: 16, flex: "column" }} style={{ width: "100%" }}></Col>
        <Col md={24} lg={{ span: 8, flex: "column" }} style={{ width: "100%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            <Translation>{(t) => t("TRACKING.EMPLOYEE")}</Translation>
          </h2>
          <Timeline mode='alternate'>
            <Timeline.Item position='right'>
              <p style={{ fontSize: "12px" }}>Start: {timeProject.start}</p>
            </Timeline.Item>
            {timelineData.map((item, index) => (
              <Timeline.Item
                key={index}
                position='left'
                label={item.label}
                dot={
                  item.type === "in" ? (
                    <Tooltip title='Check In'>
                      <CheckCircleOutlined style={{ fontSize: "16px", color: "#52c41a" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Check Out'>
                      <CloseCircleOutlined style={{ fontSize: "16px", color: "#f5222d" }} />
                    </Tooltip>
                  )
                }
              >
                {item.children}
              </Timeline.Item>
            ))}

            <Timeline.Item position='left'>
              <p style={{ fontSize: "12px" }}>End: {timeProject.end}</p>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
