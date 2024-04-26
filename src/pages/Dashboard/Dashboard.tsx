import { FolderOpenOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetCountLanguage } from "@/hooks/useLanguage";
import { useOnlyGetProjects } from "@/hooks/useProject";
import { useGetCountTechnical } from "@/hooks/useTechnical";
import { useGetAllUserNoPagination } from "@/hooks/useUser";
import BarChart from "@/interfaces/dashboard/BarChart";
import DashboardCard from "@/interfaces/dashboard/DashboardCard";
import LineChart from "@/interfaces/dashboard/LineChart";
import PieChart from "@/interfaces/dashboard/PieChart";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const { data: users } = useGetAllUserNoPagination();
  const { data: project } = useOnlyGetProjects();
  const { data: technical } = useGetCountTechnical();
  const { data: Language } = useGetCountLanguage();
  const [managerCount, setManagerCount] = useState<number>(0);
  const [nonManagerCount, setNonManagerCount] = useState<number>(0);
  const { t } = useTranslation();

  const formattedTech = (technical ?? []).map((item) => ({
    name: item.name,
    value: item.count,
  }));
  const formattedLang = (Language ?? []).map((item) => ({
    name: item.name,
    value: item.count,
  }));

  useEffect(() => {
    if (users) {
      const managerUsers = users.filter((user) => user.isManager);
      const nonManagerUsers = users.filter((user) => !user.isManager);
      setManagerCount(managerUsers.length);
      setNonManagerCount(nonManagerUsers.length);
    }
  }, [users]);

  return (
    <>
      <div className='dashBoard'>
        <Row gutter={[16, 10]}>
          <Col sm={24} md={24} lg={8}>
            <DashboardCard
              icon={
                <UserOutlined
                  style={{
                    color: "#13c2c2",
                    backgroundColor: "rgb(19 194 194 / 11%)",
                    borderRadius: 20,
                    fontSize: 30,
                    padding: 8,
                  }}
                />
              }
              title={t("DASHBOARD.MANAGER")}
              value={managerCount}
            />
          </Col>
          <Col sm={24} md={24} lg={8}>
            <DashboardCard
              icon={
                <TeamOutlined
                  style={{
                    color: "#13c2c2",
                    backgroundColor: "rgb(19 194 194 / 11%)",
                    borderRadius: 20,
                    fontSize: 30,
                    padding: 8,
                  }}
                />
              }
              title={t("DASHBOARD.EMPLOYEE")}
              value={nonManagerCount}
            />
          </Col>
          <Col sm={24} md={24} lg={8}>
            <DashboardCard
              icon={
                <FolderOpenOutlined
                  style={{
                    color: "#13c2c2",
                    backgroundColor: "rgb(19 194 194 / 11%)",
                    borderRadius: 20,
                    fontSize: 30,
                    padding: 8,
                  }}
                />
              }
              title={t("DASHBOARD.PROJECT")}
              value={(project && project.totalProjet) || 0}
            />
          </Col>
        </Row>

        <Row gutter={[16, 10]}>
          <Col sm={24} md={24} lg={16}>
            <Card className='cardBoard'>
              {project && (
                <LineChart
                  data={{
                    categories: Object.keys(project?.projectInYear),
                    value: Object.values(project?.projectInYear),
                  }}
                  title={t("DASHBOARD.STATISTICS")}
                  id='Lin1'
                />
              )}
            </Card>
          </Col>
          <Col sm={24} md={24} lg={8}>
            <Card className='cardBoard'>
              {project && (
                <BarChart
                  data={{
                    categories: Object.keys(project?.projectStatus),
                    data: Object.values(project?.projectStatus),
                  }}
                  title={t("DASHBOARD.STATUS")}
                  id='bar1'
                />
              )}
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 10]}>
          <Col sm={24} md={24} lg={8}>
            <Card className='cardBoard'>
              <PieChart data={formattedTech} title={t("DASHBOARD.TECHNICAL")} id='pieChart1' />
            </Card>
          </Col>

          <Col sm={24} md={24} lg={8}>
            <Card className='cardBoard'>
              <PieChart data={formattedLang} title={t("DASHBOARD.LANGUAGE")} id='pieChart2' />
            </Card>
          </Col>
          {/* <Col sm={24} md={24} lg={8}>
          <Card className="cardBoard">
            {project && (
              <BarChart
                data={{
                  categories: Object.keys(project?.projectStatus),
                  data: Object.values(project?.projectStatus)
                }}
                title="Status Of Projects"
                id="bar1"
              />
            )}
          </Card>
        </Col> */}
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
