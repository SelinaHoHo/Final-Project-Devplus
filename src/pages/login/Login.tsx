import { useLogin } from "@/hooks/useAuth";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Grid, Input, Tooltip, Typography, theme as antTheme } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {} from "../../apis/user.api";
import { ReactComponent as MoonSvg } from "../../assets/header/ic_moon.svg";
import { ReactComponent as SunSvg } from "../../assets/header/ic_sun.svg";
import { ReactComponent as LanguageSvg } from "../../assets/header/language.svg";
import {
  default as LoginImage,
  default as LoginImageDark,
} from "../../assets/header/last_light.png";

import { ReactComponent as LogoSvg } from "../../assets/header/logo_login.svg";
import i18n from "../../config/i18n";
import { STORAGE_KEY } from "../../constants/enum";
import { LOCALES } from "../../constants/locale";
import { setGlobalState } from "../../redux/features/global/globalSlice";
import { RootState } from "../../redux/store";
import "./login.scss";

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

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
    login: {
      backgroundColor: token.token.colorBgContainer,
      display: screens.md ? "flex" : "block",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    container: {
      margin: "0 auto",
      width: "70%",
    },
    header: {
      textAlign: "center",
    },
    section_1: {
      width: "50%",
      alignItems: "center",
      display: screens.lg ? "flex" : "none",
      flexDirection: "column",
    },
    section_2: {
      width: screens.lg ? "50%" : "100%",
      paddingTop: screens.lg ? "0" : "80px",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    text_1: {
      textAlign: "center",
      paddingBottom: "30px",
      color: token.token.colorTextSecondary,
      fontSize: "3vh",
      // fontSize: screens.md ? token.token.fontSizeHeading2 : token.token.fontSizeHeading3,
    },
    title: {
      fontSize: "5vh",
      textAlign: "center",
      // fontSize: screens.md ? token.token.fontSizeHeading1 : token.token.fontSizeHeading2,
    },
    image: {
      width: screens.xxl ? "700px" : screens.xl ? "600px" : "500px",
      height: screens.xxl ? "700px" : screens.xl ? "600px" : "500px",
    },
  };

  return (
    <div style={styles.login}>
      <section style={styles.section_1}>
        {theme === "dark" ? (
          <img style={styles.image} src={LoginImageDark} alt='Image' />
        ) : (
          <img style={styles.image} src={LoginImage} alt='Image' />
        )}

        <img
          style={styles.image}
          className='canva'
          src='https://video-public.canva.com/VAFKGwpRPik/v/d13cd2c583.gif'
          alt='Login'
        />
      </section>
      <section style={styles.section_2}>
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
              <LanguageSvg style={{ cursor: "pointer", fontSize: "25px" }} />
            ) : (
              <LanguageSvg style={{ cursor: "pointer", fontSize: "25px", color: "black" }} />
            )}
          </Dropdown>
        </div>
        <div style={styles.container}>
          <div style={styles.header}>
            <span className='anticon' style={{ fontSize: "150px", marginBottom: "20px" }}>
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
                  message: t("LOGIN.EMAIL_REQUIRED") as string,
                },
              ]}
            >
              <Input
                size='large'
                prefix={
                  <MailOutlined
                    style={{ color: "#16c2c2", fontSize: "25px", paddingRight: "5px" }}
                  />
                }
                placeholder='Email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: t("LOGIN.PASSWORD_REQUIRED") as string,
                },
              ]}
            >
              <Input.Password
                size='large'
                prefix={
                  <LockOutlined
                    style={{ color: "#16c2c2", fontSize: "25px", paddingRight: "5px" }}
                  />
                }
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block={true} size='large' type='primary' htmlType='submit'>
                {t("LOGIN.SIGN_IN")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default Login;
