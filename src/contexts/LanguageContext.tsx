import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.requests': 'Requests',
    'nav.messages': 'Messages',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Homepage
    'home.title': 'Building Community Bonds',
    'home.subtitle': 'Kampong Connect brings together elderly individuals and volunteers, fostering meaningful connections and mutual support in Singapore\'s communities.',
    'home.getStarted': 'Get Started',
    'home.signIn': 'Sign In',
    
    // Authentication
    'auth.welcomeBack': 'Welcome Back',
    'auth.signInSubtitle': 'Sign in to your Kampong Connect account',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.createAccount': 'Create Account',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    
    // Categories
    'category.general': 'General Assistance',
    'category.household': 'Household Chores', 
    'category.shopping': 'Shopping',
    'category.wellbeing': 'Wellbeing',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
  },
  zh: {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.requests': '请求',
    'nav.messages': '消息',
    'nav.profile': '个人资料',
    'nav.login': '登录',
    'nav.signup': '注册',
    
    // Homepage
    'home.title': '建设社区联系',
    'home.subtitle': '甘榜连接将老年人和志愿者聚集在一起，在新加坡社区中促进有意义的联系和相互支持。',
    'home.getStarted': '开始使用',
    'home.signIn': '登录',
    
    // Authentication
    'auth.welcomeBack': '欢迎回来',
    'auth.signInSubtitle': '登录您的甘榜连接账户',
    'auth.email': '电子邮件地址',
    'auth.password': '密码',
    'auth.confirmPassword': '确认密码',
    'auth.rememberMe': '记住我',
    'auth.forgotPassword': '忘记密码？',
    'auth.signIn': '登录',
    'auth.signUp': '注册',
    'auth.createAccount': '创建账户',
    'auth.noAccount': '没有账户？',
    'auth.hasAccount': '已经有账户？',
    
    // Categories
    'category.general': '一般协助',
    'category.household': '家务',
    'category.shopping': '购物',
    'category.wellbeing': '福利',
    
    // Common
    'common.loading': '加载中...',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.all': '全部',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('kampong_connect_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('kampong_connect_language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};