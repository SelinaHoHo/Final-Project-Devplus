import DetailProjectCom from "@/components/detail/DetailProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { setProjectDetailName } from "@/redux/features/tagView/tagViewSlice";
import { Breadcrumb, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./detailProject.scss";

const DetailProject = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetDetailProject(id as string);
  if (data) {
    dispatch(setProjectDetailName(data.name));
  }
  return (
    <div className='page-detail-project'>
      <Space style={{ marginLeft: 10, marginBottom: 10 }} direction='vertical'>
        <Breadcrumb
          items={[
            {
              title: <a onClick={() => navigate("/projects/list")}>{t("MENU.LIST_PROJECTS")}</a>,
            },
            {
              title: t("DETAIL_PROJECT.DETAIL"),
            },
            {
              title: data?.name,
            },
          ]}
        />
      </Space>
      {isLoading ? <p>Loading...</p> : <DetailProjectCom data={data} />}
    </div>
  );
};

export default DetailProject;
