import { Table } from "@/components/core/Table/Table";
import { useGetProjects } from "@/hooks/useProject";
import { IProject } from "@/interfaces/project/projects.interface";
import { Button, Col, Row } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListProject.scss";
import { ProjectsColumnsTable } from "./ProjectListColumn";

const ListProject = () => {
  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });

  const [filterName, setFilterName] = useState("");

  const paginatorSearch = {
    name: filterName,
    page: table.page,
    take: table.take,
  };

  const { data, isLoading, refetch } = useGetProjects(paginatorSearch);
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

  const onSearch = () => {
    setTable({
      page: 1,
      take: 10,
    });
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [table, refetch]);

  return (
    <>
      <Row>
        <Col span={12}>
          <Search
            placeholder='search project'
            onChange={(value) => setFilterName(value.target.value)}
            allowClear
            onSearch={onSearch}
            style={{ width: 250 }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "end" }}>
          <Button type='primary'>
            <Link to='../CreateProject'>Create Project</Link>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            scroll={{ y: 300 }} // thay đổi giá trị y tùy ý
            paginate={{
              table,
              setTable,
              total: data?.meta.itemCount,
              pageCount: data?.meta.pageCount,
            }}
            columns={ProjectsColumnsTable(handleAction, true)}
            loading={isLoading}
            dataSource={data?.data}
          />
        </Col>
      </Row>
    </>
  );
};
export default ListProject;
