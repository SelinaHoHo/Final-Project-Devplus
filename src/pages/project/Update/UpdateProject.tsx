import UpdateProjectForm from "@/components/update/UpdateProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { RootState } from "@/redux/store";
import { LeftSquareOutlined } from "@ant-design/icons";
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
      <LeftSquareOutlined style={{ fontSize: 25 }} onClick={() => navigate(-1)} />
      {theme === "dark" ? (
        <div className='form-create-dark'>
          {isLoading ? <p>Loading...</p> : <UpdateProjectForm data={data} />}
        </div>
      ) : (
        <div className='form-create-light'>
          {isLoading ? <p>Loading...</p> : <UpdateProjectForm data={data} />}
        </div>
      )}
    </div>
  );
};

export default UpdateProject;
