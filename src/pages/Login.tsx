import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  Typography,
  Tooltip,
  Dropdown,
  theme as antTheme,
} from "antd";
import { ReactComponent as MoonSvg } from "../assets/header/ic_moon.svg";
import { ReactComponent as SunSvg } from "../assets/header/ic_sun.svg";
import { ReactComponent as LanguageSvg } from "../assets/header/language.svg";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";
import { useDispatch, useSelector } from "react-redux";
import { STORAGE_KEY } from "../constants/enum";
import { LOCALES } from "../constants/locale";
import { setGlobalState } from "../redux/features/global/globalSlice";
import { RootState } from "../redux/store";
import "../components/login/login.scss";
import { ReactComponent as LogoSvg } from "../assets/header/logo_login.svg";
import {} from "../apis/user.api";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Text, Title, Link, Paragraph } = Typography;

const Login: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: handleLogin } = useLogin();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const onChangeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  const handleChangeLanguage = async ({ key }: { key: string }) => {
    localStorage.setItem(STORAGE_KEY.LOCALES, key);
    await i18n.changeLanguage(key);
  };

  const onFinish = (values: { email: string; password: string }) => {
    handleLogin(values);
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      margin: "0 auto",
      width: "380px",
    },
    footer: {
      marginTop: token.token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      color: "#13c2c2",
      float: "right",
    },
    header: {
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.token.colorBgContainer,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    text_1: {
      textAlign: "center",
      paddingBottom: "20px",
      color: token.token.colorTextSecondary,
    },
    text: {
      color: token.token.colorTextSecondary,
    },
    title: {
      textAlign: "center",
      fontSize: screens.md ? token.token.fontSizeHeading1 : token.token.fontSizeHeading2,
    },
  };

  return (
    <section style={styles.section}>
      <div className='actions-extra bg-2'>
        <Tooltip title={t("MENU.SWITCH_THEME")}>
          <span onClick={onChangeTheme} style={{ cursor: "pointer", fontSize: "23px" }}>
            {theme === "dark" ? <SunSvg /> : <MoonSvg />}
          </span>
        </Tooltip>
        <Dropdown
          menu={{
            onClick: (value) => handleChangeLanguage(value),
            items: [
              {
                key: LOCALES.VI,
                label: "Vietnamese",
              },
              {
                key: LOCALES.EN,
                label: "English",
              },
            ],
          }}
        >
          {theme === "dark" ? (
            <LanguageSvg style={{ cursor: "pointer", fontSize: "23px" }} />
          ) : (
            <LanguageSvg style={{ cursor: "pointer", fontSize: "23px", color: "black" }} />
          )}
        </Dropdown>
      </div>
      <div style={styles.container}>
        <div style={styles.header}>
          <span className='anticon' style={{ fontSize: "100px", marginTop: "20%" }}>
            <LogoSvg />
          </span>
          <Title style={styles.title}>{t("LOGIN.SIGN_IN")}</Title>
          <Paragraph style={styles.text_1}>{t("LOGIN.SIGN_IN_TITLE")}</Paragraph>
        </div>
        <Form
          form={form}
          name='normal_login'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout='vertical'
          requiredMark='optional'
        >
          <Form.Item
            name='email'
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>{t("LOGIN.REMEMBER_ME")}</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href=''>
              {t("LOGIN.FORGOT_PASSWORD")}
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block={true} size='large' type='primary' htmlType='submit'>
              {t("LOGIN.SIGN_IN")}
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>{t("LOGIN.QUESTION")}</Text>{" "}
              <Link style={{ color: "#13c2c2" }} href=''>
                {t("LOGIN.LINK")}
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
