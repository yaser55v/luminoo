import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth.welcomeBack')}
      description={t('auth.loginDescription')}
    >
      <EmailLoginForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-muted-foreground">
            {t('common.or')}
          </span>
        </div>
      </div>
      <SocialAuth />
      <p className="px-8 text-center text-sm text-muted-foreground">
        {t('auth.dontHaveAccount')}{' '}
        <Link
          to="/signup"
          className="hover:text-brand underline underline-offset-4 hover:text-purple-400"
        >
          {t('common.signup')}
        </Link>
      </p>
    </AuthLayout>
  );
}