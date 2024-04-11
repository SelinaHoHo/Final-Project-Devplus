import { Table } from "@/components/core/Table/Table";
import { IProject } from "@/interfaces/project/projects.interface";
import { Button, Col, Row } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ListProject.scss";
import { ProjectsColumnsTable } from "./ProjectListColumn";
const data: IProject[] = [
  {
    id: "1",
    project_name: "John Brown",
    start_date: "10-04-2022",
    target_completion_date: "10-04-2022",
    project_status: ["In Process"],
    progress: 40,
  },
  {
    id: "2",
    project_name: "Jim Green",
    start_date: "10-04-2022",
    target_completion_date: "10-04-2022",
    project_status: ["Testing"],
    progress: 30,
  },
  {
    id: "3",
    project_name: "Joe Black",
    start_date: "10-04-2022",
    target_completion_date: "10-04-2022",
    project_status: ["Done"],
    progress: 100,
  },
];

const ListProject = () => {
  const handleAction = (key: string, _item: IProject) => {
    switch (key) {
      // case "update":
      //   navigate(`/application/${item.id}`);
      //   break;
      // case "detail":
      //   navigate(`/courses/${item.id}`);
      //   break;
      // case "delete":
      //   openModal(
      //     () => {
      //       onDeleteApplication(item.id);
      //     },
      //     ModalTypeEnum.CONFIRM,
      //     ICON_URL.ICON_TRASH,
      //     t("MODAL.CONFIRM_DELETE", { name: item.name }),
      //     t("MODAL.TITLE_DELETE", { name: item.name })
      //   );
      //   break;
      default:
    }
  };
  const [table, setTable] = useState({
    page: 1,
    take: 5,
  });
  return (
    <>
      <Row>
        <Col span={24}>
          <Button type='primary'>
            <Link to='../CreateProject'>Create Project</Link>
          </Button>
        </Col>
        <Col span={4}>
          <Search
            placeholder='search project'
            allowClear
            // onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            scroll={{ x: "max-content" }}
            paginate={{
              table,
              setTable,
              total: data?.length || 0,
              pageCount: 10,
            }}
            columns={ProjectsColumnsTable(handleAction, true)}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
};
export default ListProject;
