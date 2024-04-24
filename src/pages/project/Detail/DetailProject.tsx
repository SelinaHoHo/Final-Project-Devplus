import DetailProjectCom from "@/components/detail/DetailProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { Breadcrumb, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "./detailProject.scss";

const { Title } = Typography;
const DetailProject = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetDetailProject(id as string);
  return (
    <div className='page-detail-project'>
      <Space style={{ marginLeft: 10 }} direction='vertical'>
        <Breadcrumb
          items={[
            {
              title: <a onClick={() => navigate("/projects/list")}>{t("MENU.LIST_PROJECTS")}</a>,
            },
            {
              title: t("DETAIL_PROJECT.DETAIL"),
            },
          ]}
        />
        <Title level={3}>{data?.name}</Title>
      </Space>
      {isLoading ? <p>Loading...</p> : <DetailProjectCom data={data} />}
    </div>
  );
};

export default DetailProject;
