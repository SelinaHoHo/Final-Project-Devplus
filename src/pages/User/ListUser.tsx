import { Table } from "@/components/core/Table/Table";
import i18n from "@/config/i18n";
import { useGetAccounts } from "@/hooks/useUser";
import { IUser } from "@/interfaces/user/users.interface";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Translation } from "react-i18next";
import { UsersColumnsTable } from "./UserListColumn";

const ListUser = () => {
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
  const { data, isLoading, refetch } = useGetAccounts(paginatorSearch);

  useEffect(() => {
    if (filterName === "") {
      setFilterName("");
      refetch();
    }
  }, [filterName, refetch]);

  const handleChangeSearch = (value: string) => {
    if (value === "") {
      setFilterName("");
      refetch();
    } else {
      setFilterName(value);
    }
  };

  const handleAction = (key: string, _item: IUser) => {
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

  const handleSearch = () => {
    setTable({
      page: 1,
      take: 10,
    });
    refetch();
  };

  return (
    <>
      <div style={{ margin: "3px" }}>
        <Row gutter={5}>
          <Col>
            <Input
              placeholder={i18n.t("TABLE.SEARCH_NAME")}
              size='large'
              allowClear
              onChange={(value) => handleChangeSearch(value.target.value)}
            ></Input>
          </Col>
          <Col>
            <Button type='primary' onClick={handleSearch} size='large'>
              <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
            </Button>
          </Col>
        </Row>
      </div>
      <Table<IUser>
        paginate={{
          table,
          setTable,
          total: data?.meta.itemCount,
          pageCount: data?.meta.pageCount,
        }}
        columns={UsersColumnsTable(handleAction)}
        loading={isLoading}
        dataSource={data?.data}
      />
    </>
  );
};
export default ListUser;
