import CreateEmployeeForm from "@/components/form/Employee/CreateEmployeeForm";
import { RootState } from "@/redux/store";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./CreateUser.scss";
const { Title } = Typography;

const CreateUser = () => {
  const { t } = useTranslation();

  const { theme } = useSelector((state: RootState) => state.global);

  return (
    <div className='page-create-employee'>
      <Title level={2}>{t("CREATE_EMPLOYEE.CREATE_EMPLOYEE")}</Title>
      {theme === "dark" ? (
        <div className='form-create-dark'>
          <CreateEmployeeForm />
        </div>
      ) : (
        <div className='form-create-light'>
          <CreateEmployeeForm />
        </div>
      )}
    </div>
  );
};

export default CreateUser;
