import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Facebook, Mail } from "lucide-react";
import { signInWithProvider } from "@/lib/auth";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export function SocialAuth() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        onClick={() => signInWithProvider('google')}
        className="bg-white/5 text-white hover:bg-white/10"
      >
        <GoogleIcon className="mr-2 h-4 w-4" />
        {t('common.continueWith', { provider: 'Google' })}
      </Button>
      <Button
        variant="outline"
        onClick={() => signInWithProvider('facebook')}
        className="bg-white/5 text-white hover:bg-white/10"
      >
        <Facebook className="mr-2 h-4 w-4" />
        {t('common.continueWith', { provider: 'Facebook' })}
      </Button>
    </div>
  );
}