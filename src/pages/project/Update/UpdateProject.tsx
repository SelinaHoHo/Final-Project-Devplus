import UpdateEmployeeProject from "@/components/update/UpdateEmployeeProject";
import UpdateProjectForm from "@/components/update/UpdateProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { setProjectDetailName } from "@/redux/features/tagView/tagViewSlice";
import { RootState } from "@/redux/store";
import { Breadcrumb, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./updateProject.scss";

const UpdateProject = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetDetailProject(id as string);

  if (data) {
    dispatch(setProjectDetailName(data.name));
  }

  return (
    <div className='page-update-project'>
      <Breadcrumb
        items={[
          {
            title: <a onClick={() => navigate("/projects/list")}>{t("MENU.LIST_PROJECTS")}</a>,
          },
          {
            title: t("UPDATE_PROJECT.SUBMIT"),
          },
          {
            title: data?.name,
          },
        ]}
      />
      {theme === "dark" ? (
        <div className='form-update-dark'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Space direction='vertical' size='large'>
              <UpdateProjectForm data={data} />
              <UpdateEmployeeProject data={data} />
            </Space>
          )}
        </div>
      ) : (
        <div className='form-update-light'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Space direction='vertical' size='large'>
              <UpdateProjectForm data={data} />
              <UpdateEmployeeProject data={data} />
            </Space>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateProject;
