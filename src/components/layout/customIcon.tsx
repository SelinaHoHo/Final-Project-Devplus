import type { FC } from "react";
import { ReactComponent as LangSvg } from "../../assets/menu/coding-svgrepo-com.svg";
import { ReactComponent as TechSvg } from "../../assets/menu/database-svgrepo-com.svg";
import { ReactComponent as DashboardSvg } from "../../assets/menu/ic_dashboard.svg";
import { ReactComponent as ProjectSvg } from "../../assets/menu/ic_file.svg";
import { ReactComponent as UserSvg } from "../../assets/menu/ic_user.svg";
import { ReactComponent as PosSvg } from "../../assets/menu/job-position.svg";
interface CustomIconProps {
  type: string;
}
const iconsComponents: Record<string, FC> = {
  dashboard: DashboardSvg,
  user: UserSvg,
  project: ProjectSvg,
  technical: TechSvg,
  language: LangSvg,
  position: PosSvg,
};
export const CustomIcon: FC<CustomIconProps> = ({ type }) => {
  const IconComponent = iconsComponents[type] || DashboardSvg;
  return (
    <span className='anticon' style={{ fontSize: "25px", width: "auto" }}>
      <IconComponent />
    </span>
  );
};
