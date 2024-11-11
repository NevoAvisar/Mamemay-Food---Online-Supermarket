import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

// הגדרת ולידציה של Joi עבור שדות הטופס
const loginValidationSchema = Joi.object({
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

function AuthLogin() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // ניהול טופס עם React Hook Form, כולל הגדרת ולידציה עם Joi
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginValidationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log({ errors });
  // פונקציה לטיפול בהגשת הטופס
  function onSubmit(data) {
    dispatch(loginUser(data)).then((response) => {
      if (response?.payload?.success) {
        toast({
          title: response?.payload?.message,
          variant: "success",
        });
      } else {
        toast({
          title: response?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("Sign in to your account")}
        </h1>
        <p className="mt-2">
          {t("Don&apos;t have an account")}
          <Link
            className="font-medium mr-2 text-primary hover:underline"
            to="/auth/register"
          >
            {t("Register")}
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={t("Sign In")}
        onSubmit={handleSubmit(onSubmit)} // משתמשים ב-handleSubmit של React Hook Form
        control={control} // מעבירים את ה-control עבור ניהול השדות
        errors={errors} // מעבירים את השגיאות לתצוגה ב-CommonForm
      />
    </div>
  );
}

export default AuthLogin;
