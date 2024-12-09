import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/slices/languageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: 'en', name: 'English', countries: ['US', 'GB', 'AU'] },
  { code: 'it', name: 'Italiano', countries: ['IT'] },
  { code: 'ar', name: 'العربية', countries: ['SA', 'AE', 'EG'] },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get user's browser language
    const browserLang = navigator.language.split('-')[0];
    // Get user's country from browser
    const userCountry = navigator.language.split('-')[1];

    // Find appropriate language based on country or fallback to browser language
    const defaultLang = languages.find(lang => 
      lang.countries.includes(userCountry) || lang.code === browserLang
    )?.code || 'en';

    handleLanguageChange(defaultLang);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    dispatch(setLanguage(languageCode));
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language)?.name || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-white hover:bg-white/10"
          size="sm"
        >
          {currentLanguage}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-gray-800">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`text-white hover:bg-white/10 ${
              i18n.language === lang.code ? 'bg-white/5' : ''
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
