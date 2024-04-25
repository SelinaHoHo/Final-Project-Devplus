import { Card, Timeline, Tooltip } from "antd";
import { UserDeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { Translation } from "react-i18next";
import Meta from "antd/es/card/Meta";
import { t } from "i18next";
import { IProjectDetail, projectHistory } from "@/interfaces/project/projects.interface";
import { FC } from "react";
import "./Tracking.scss";

type DataProps = {
  data: IProjectDetail | undefined;
};

const Tracking: FC<DataProps> = ({ data }) => {
  const formattedDate = (date: string | Date) => {
    const formatted = new Date(date);
    return `${formatted.getFullYear()}-${(formatted.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${formatted.getDate().toString().padStart(2, "0")}`;
  };
  const timeProject = {
    start: formattedDate(data?.startDate || new Date()),
    end: formattedDate(data?.endDate || new Date()),
  };
  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        <Translation>{(t) => t("TRACKING.EMPLOYEE")}</Translation>
      </h2>
      <Timeline className='timeLineAnt' mode='alternate'>
        <Timeline.Item position='right'>
          <p style={{ fontSize: "15px" }}>{t("TRACKING.START", { time: timeProject.start })}</p>
        </Timeline.Item>
        {data?.projectHistory.map((item: projectHistory, _index) => (
          <Timeline.Item
            // key={index}
            // position='right'
            // label={item.label}
            dot={
              item.type === "ADD-EMPLOYEE" ? (
                <Tooltip title={t("TRACKING.IN")}>
                  <UserAddOutlined style={{ fontSize: "16px", color: "#52c41a" }} />
                </Tooltip>
              ) : (
                <Tooltip title={t("TRACKING.OUT")}>
                  <UserDeleteOutlined style={{ fontSize: "16px", color: "#f5222d" }} />
                </Tooltip>
              )
            }
          >
            {/*  */}
            <Card style={{ width: "95%", marginTop: 16 }}>
              <Meta
                title={formattedDate(item?.createDate || new Date())}
                // description={t(item.type === "ADD-EMPLOYEE" ? "TRACKING.PARTICIPATED" : "TRACKING.OUT", { name: item?.description })}
                // description={t("TRACKING.PARTICIPATED" , { name: item?.description })}
                description={item?.description}
              />
            </Card>
          </Timeline.Item>
        ))}
        <Timeline.Item position='left'>
          <p style={{ fontSize: "15px" }}>{t("TRACKING.END", { time: timeProject.end })}</p>
        </Timeline.Item>
      </Timeline>
    </>
  );
};

export default Tracking;
