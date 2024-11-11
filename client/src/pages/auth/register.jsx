import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

// סכמת ולידציה באמצעות Joi עבור שדות הרישום
const registerValidationSchema = Joi.object({
  userName: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": t("User name is required"),
      "string.min": t("User name must be at least 3 characters"),
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": t("Email is required"),
      "string.email": t("Invalid email address"),
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": t("Password is required"),
      "string.min": t("Password must be at least 6 characters"),
    }),
});

function AuthRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ניהול טופס עם React Hook Form, כולל ולידציה עם Joi
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerValidationSchema), // הגדרת הוולידציה עם Joi
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  // פונקציה לטיפול בהגשת הטופס
  function onSubmit(data) {
    dispatch(registerUser(data)).then((response) => {
      if (response?.payload?.success) {
        toast({
          title: response?.payload?.message,
          variant: "success",
        });
        navigate("/auth/login"); // מעבר לדף התחברות לאחר רישום מוצלח
      } else {
        toast({
          title: t(response?.payload?.message),
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("Create new account")}
        </h1>
        <p className="mt-2">
          {t("Already have an account")}
          <Link
            className="font-medium mr-2 text-primary hover:underline"
            to="/auth/login"
          >
            {t("Login")}
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={t("Sign Up")}
        onSubmit={handleSubmit(onSubmit)} // שימוש בפונקציית handleSubmit של React Hook Form
        control={control} // העברת ה-control ל-CommonForm לניהול השדות
        errors={errors} // העברת השגיאות לתצוגה ב-CommonForm
      />
    </div>
  );
}

export default AuthRegister;
