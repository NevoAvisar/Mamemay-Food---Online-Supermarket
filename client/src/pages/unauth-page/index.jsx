import { t } from "i18next";
import { useNavigate } from "react-router-dom";

function UnAuthPage() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate("/shop/home");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>{t("You don&apos;t have access to view this page")}</h1>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        {t("Go to Home Page")}
      </button>
    </div>
  );
}

export default UnAuthPage;
