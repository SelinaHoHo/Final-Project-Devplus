import { Table } from "@/components/core/Table/Table";
import { useGetProjects, useUpdateStatus } from "@/hooks/useProject";
import { ColumnIProject } from "@/interfaces/project/projects.interface";
import { Button, Col, Row } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleAction = (key: string, _item: ColumnIProject) => {
    switch (key) {
      // case "update":
      //   navigate(`/application/${item.id}`);
      //   break;
      case "detail":
        navigate(`/projects/${_item.id}`);
        break;
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

  const { mutate: handleUpdateStatus } = useUpdateStatus();
  const handleChange = (value: string, item: ColumnIProject) => {
    handleUpdateStatus({ id: item.id, status: value });
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
            <Link to='../create'>Create Project</Link>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            scroll={{ x: "max-content" }}
            paginate={{
              table,
              setTable,
              total: data?.meta.itemCount || 1,
              pageCount: data?.meta.pageCount || 10,
            }}
            columns={ProjectsColumnsTable(handleAction, handleChange, true)}
            loading={isLoading}
            dataSource={data?.data.filter((project) => !project.isDelete)}
          />
        </Col>
      </Row>
    </>
  );
};
export default ListProject;
