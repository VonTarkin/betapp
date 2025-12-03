import { useEffect, useState } from "react";
import AccountInfo from "../components/AccountInfo";
import AppLayout from "../layout/AppLayout";
import { useTranslation } from "../i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

export default function AccountPage() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState({
    visible: false,
    type: "error",
    message: "",
  });

  const showError = (msg) => {
    setNotification({
      visible: true,
      type: "error",
      message: msg,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept-Language": lang,
          },
        });

        if (!res.ok) {
          let msg = t("general.unexpectedServerError");

          try {
            const body = await res.json();
            if (body?.message) {
              msg = body.message;
            }
          } catch (e) {
            console.error("Error parsing error body", e);
          }

          showError(msg);

          if (res.status === 401) {
            localStorage.removeItem("authToken");
            navigate("/login");
          }

          return;
        }

        const body = await res.json();
        setData(body);
      } catch (err) {
        console.error(err);
        showError(t("general.unexpectedServerError"));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [lang, navigate]);

  return (
    <AppLayout>
      {}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, visible: false }))
        }
      />

      {loading && <p>{t("general.loading")}</p>}

      {!loading && data && (
        <AccountInfo
          accountName={data.accountName}
          email={data.email}
          creationDate={data.creationDate}
        />
      )}

      {!loading && !data && (
        <p>{t("general.unexpectedServerError")}</p>
      )}
    </AppLayout>
  );
}
