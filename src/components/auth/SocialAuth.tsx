import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Facebook } from "lucide-react";
import { toast } from "sonner";
import { signInWithProvider } from "@/lib/auth";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export function SocialAuth() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    try {
      await signInWithProvider(provider);
      toast.success(t('auth.loginSuccess'), {
        description: t('auth.welcomeBack'),
      });
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(t('auth.socialAuthError'), {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        onClick={() => handleSocialAuth('google')}
        className="bg-white/5 text-white hover:bg-white/10"
      >
        <GoogleIcon className="mr-2 h-4 w-4" />
        {t('common.continueWith', { provider: 'Google' })}
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialAuth('facebook')}
        className="bg-white/5 text-white hover:bg-white/10"
      >
        <Facebook className="mr-2 h-4 w-4" />
        {t('common.continueWith', { provider: 'Facebook' })}
      </Button>
    </div>
  );
}