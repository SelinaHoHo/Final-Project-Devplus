import UpdateEmployeeProject from "@/components/update/UpdateEmployeeProject";
import UpdateProjectForm from "@/components/update/UpdateProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { RootState } from "@/redux/store";
import { LeftSquareOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./updateProject.scss";

const UpdateProject = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetDetailProject(id as string);
  return (
    <div className='page-update-project'>
      <LeftSquareOutlined style={{ fontSize: 25 }} onClick={() => navigate("/projects/list")} />
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
