import CreateProjectForm from "@/components/form/project/createProjectForm";
import { RootState } from "@/redux/store";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./createProject.scss";

const { Title } = Typography;
const CreateProject = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const { t } = useTranslation();
  return (
    <div className='page-create-project'>
      <Title level={2}>{t("CREATE_PROJECT.TITLE")}</Title>
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
