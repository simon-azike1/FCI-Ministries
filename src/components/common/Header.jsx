import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../utils/constants';

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/FCI__Logo-modified.png" alt="FCI Ministries" className="h-12 w-auto" />
            <span className="text-xl font-bold text-secondary hidden md:block">FCI Ministries</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.home')}</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.about')}</Link>
            <Link to="/ministries" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.ministries')}</Link>
            <Link to="/sermons" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.sermons')}</Link>
            <Link to="/events" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.events')}</Link>
            <Link to="/give" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.give')}</Link>
            <Link to="/get-involved" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.getInvolved')}</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">{t('nav.contact')}</Link>
          </nav>

          <div className="flex items-center space-x-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`text-2xl px-2 py-1 rounded transition-all ${
                  i18n.language === lang.code
                    ? 'bg-primary text-white scale-110'
                    : 'hover:bg-gray-100'
                }`}
                title={lang.name}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
