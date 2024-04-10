import CreateUserForm from "@/components/form/createUserForm";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./CreateUser.scss";

const CreateUser = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className='page-create-user'>
        <Breadcrumb
          items={[
            {
              title: <Link to='../list'>{t("MENU.LIST_USERS")}</Link>,
            },
            {
              title: t("MENU.CREATE_USER"),
            },
          ]}
        />

        {/* Form */}
        <div className='form-create'>
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
