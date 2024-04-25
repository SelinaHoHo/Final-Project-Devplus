/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootState } from "@/redux/store";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  Divider,
  Empty,
  Pagination,
  Row,
  Select,
  Space,
  Table as TableAntd,
  Typography,
} from "antd";
import { TableProps as TablePropsAntd } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./Table.scss";

export interface PaginateProp {
  page: number;
  take: number;
}

interface HasId {
  id?: any;
  Id?: any;
}

interface PaginateOptions {
  table: PaginateProp;
  setTable: (value: any) => void;
  total: number;
  pageCount: number;
}

const pageSizeOptions = [{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }, { value: 100 }];

type TableProps<T> = TablePropsAntd<T> & {
  paginate?: PaginateOptions;
};

export const Table = <T extends HasId>({ paginate, dataSource, ...rest }: TableProps<T>) => {
  const { t } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.global);

  return (
    <>
      <TableAntd
        {...rest}
        style={{
          boxShadow: "0 6px 8px -6px #ededed",
          position: "relative",
          overflowX: "auto",
        }}
        sticky={true}
        dataSource={dataSource}
        rowKey={(record) => record.id || record.Id}
        scroll={{ x: "max-content" }}
        pagination={false}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("TABLE.EMPTY")} />,
        }}
      />
      {paginate && (
        <Row
          justify='space-between'
          style={{
            padding: "10px 0",
            backgroundColor: theme === "dark" ? "rgb(29 29 29)" : "white",
            borderRadius: "0 0 8px 8px",
          }}
        >
          <Space>
            <Typography>
              {t("TABLE.TOTAL_PAGE", {
                total: paginate.pageCount,
              })}
            </Typography>
            <Divider type='vertical' />
            <Typography>
              {t("TABLE.DISPLAY")}
              <Select
                style={{ marginLeft: 5, marginRight: 5, width: 70 }}
                defaultValue={paginate.table.take}
                onChange={(value: number) => {
                  paginate.setTable({
                    ...paginate.table,
                    take: value,
                    page: 1,
                  });
                }}
                options={pageSizeOptions}
                getPopupContainer={(triggerNode: HTMLElement) =>
                  triggerNode.parentNode as HTMLElement
                }
              />
              {t("Item")}
            </Typography>
          </Space>
          <Pagination
            showSizeChanger={false}
            current={paginate.table.page}
            total={paginate.total}
            pageSize={paginate.table.take}
            itemRender={(_, type: string, originalElement) => {
              switch (type) {
                case "prev":
                  return <ArrowLeftOutlined />;
                case "next":
                  return <ArrowRightOutlined />;
                default:
                  return originalElement;
              }
            }}
            onChange={(page: number) => {
              paginate.setTable({
                ...paginate.table,
                page: page,
              });
            }}
          />
        </Row>
      )}
    </>
  );
};
