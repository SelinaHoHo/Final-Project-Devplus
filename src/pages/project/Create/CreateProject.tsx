import CreateProjectForm from "@/components/form/project/createProjectForm";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import "./createProject.scss";

const CreateProject = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  return (
    <div className='page-create-project'>
      {theme === "dark" ? (
        <div className='form-create-dark'>
          <CreateProjectForm />
        </div>
      ) : (
        <div className='form-create-light'>
          <CreateProjectForm />
        </div>
      )}
    </div>
  );
};

export default CreateProject;
