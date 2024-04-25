import DetailForm from "@/components/detail/Employee/DetailForm";
import { useGetDetailEmployee } from "@/hooks/useUser";
import { setEmployeeDetailName } from "@/redux/features/tagView/tagViewSlice";
import { Breadcrumb, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./EmployeeDetail.scss";

const EmployeeDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetDetailEmployee(id as string);

  if (data?.profile?.fullName) {
    dispatch(setEmployeeDetailName(data.profile.fullName));
  }

  return (
    <div className='page-detail-employee'>
      <Breadcrumb
        style={{ marginBottom: 10, marginLeft: 10 }}
        items={[
          {
            title: <a onClick={() => navigate("/employees/list")}>{t("MENU.LIST_USERS")}</a>,
          },
          {
            title: t("DETAIL_EMPLOYEE.DETAIL"),
          },
          {
            title: data?.profile?.fullName,
          },
        ]}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin tip='Loading' size='large' spinning={isLoading}>
          <DetailForm data={data} />
        </Spin>
      </div>
    </div>
  );
};

export default EmployeeDetail;
