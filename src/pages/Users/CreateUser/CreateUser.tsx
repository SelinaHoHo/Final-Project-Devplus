import CreateEmployeeForm from "@/components/form/Employee/CreateEmployeeForm";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import "./CreateUser.scss";

const CreateUser = () => {
  const { theme } = useSelector((state: RootState) => state.global);

  return (
    <div className='page-create-employee'>
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
