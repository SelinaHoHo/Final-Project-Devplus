import CreateUserForm from "@/components/form/createUserForm";
import ButtonBack from "@/components/layout/buttonBack/buttonBack";
import { Link } from "react-router-dom";

import "./CreateUser.scss";

const CreateUser = () => {
  return (
    <div className='page-create-user'>
      {/* Back Button */}
      <Link to='../list'>
        <ButtonBack />
      </Link>

      {/* Form */}
      <div className='form-create'>
        <CreateUserForm />
      </div>
    </div>
  );
};

export default CreateUser;
