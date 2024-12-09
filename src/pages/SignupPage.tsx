import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { EmailSignupForm } from "@/components/auth/EmailSignupForm";

export function SignupPage() {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth.createAccount')}
      description={t('auth.signupDescription')}
    >
      <EmailSignupForm />
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
        {t('auth.alreadyHaveAccount')}{' '}
        <Link
          to="/login"
          className="hover:text-brand underline underline-offset-4 hover:text-purple-400"
        >
          {t('common.login')}
        </Link>
      </p>
    </AuthLayout>
  );
}