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
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcomeElder': 'your activity overview',
    'dashboard.welcomeVolunteer': 'what\'s happening in your community',
    'dashboard.myRequests': 'My Requests',
    'dashboard.availableRequests': 'Available Requests',
    'dashboard.tasksCompleted': 'Tasks Completed',
    'dashboard.peopleHelped': 'People Helped',
    'dashboard.newMessages': 'New Messages',
    'dashboard.yourRating': 'Your Rating',
    'dashboard.myRecentRequests': 'My Recent Requests',
    'dashboard.recentCommunityRequests': 'Recent Community Requests',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.requestHelp': 'Request Help',
    'dashboard.requestHelpDesc': 'Post a new assistance request',
    'dashboard.viewMessages': 'View Messages',
    'dashboard.viewMessagesDesc': 'Chat with volunteers',
    'dashboard.updateProfile': 'Update Profile',
    'dashboard.updateProfileDesc': 'Manage your preferences',
    'dashboard.browseRequests': 'Browse Requests',
    'dashboard.browseRequestsDesc': 'Find ways to help nearby',
    'dashboard.myCommitments': 'My Commitments',
    'dashboard.myCommitmentsDesc': 'View accepted requests',
    'dashboard.updateAvailability': 'Update Availability',
    'dashboard.updateAvailabilityDesc': 'Manage your schedule',

    // Requests
    'requests.myRequests': 'My Requests',
    'requests.availableRequests': 'Available Requests',
    'requests.manageRequests': 'Manage your assistance requests',
    'requests.browseHelp': 'Browse and help with community requests',
    'requests.newRequest': 'New Request',
    'requests.searchRequests': 'Search requests...',
    'requests.allCategories': 'All Categories',
    'requests.offerHelp': 'Offer Help',
    'requests.viewDetails': 'View Details',
    'requests.noRequests': 'No requests found matching your criteria.',
    'requests.createTitle': 'Create New Request',
    'requests.requestTitle': 'Request Title',
    'requests.requestTitlePlaceholder': 'What do you need help with?',
    'requests.category': 'Category',
    'requests.description': 'Description',
    'requests.descriptionPlaceholder': 'Please provide more details about what you need help with...',
    'requests.date': 'Date',
    'requests.time': 'Time',
    'requests.duration': 'Duration (minutes)',
    'requests.address': 'Address',
    'requests.addressPlaceholder': 'Where do you need help?',
    'requests.postalCode': 'Postal Code',
    'requests.urgency': 'Urgency',
    'requests.lowPriority': 'Low Priority',
    'requests.mediumPriority': 'Medium Priority',
    'requests.highPriority': 'High Priority',
    'requests.creating': 'Creating...',
    'requests.createRequest': 'Create Request',
    'requests.status.open': 'open',
    'requests.status.matched': 'matched',
    'requests.status.completed': 'completed',
    'requests.status.inProgress': 'in progress',
    'requests.matchedWith': 'Matched with volunteer',

    // Profile
    'profile.title': 'Profile',
    'profile.elderMember': 'Elder Member',
    'profile.volunteerMember': 'Volunteer Member',
    'profile.personalInfo': 'Personal Information',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.address': 'Address',
    'profile.bio': 'Bio',
    'profile.languages': 'Languages',
    'profile.age': 'Age',
    'profile.servicesOffered': 'Services Offered',
    'profile.availability': 'Availability',
    'profile.emergencyContact': 'Emergency Contact',
    'profile.relationship': 'Relationship',
    'profile.phoneNumber': 'Phone Number',

    // Accessibility
    'accessibility.switchLanguage': 'Switch Language',
    'accessibility.toggleFontSize': 'Toggle Font Size',

    // Time
    'time.30min': '30 minutes',
    'time.1hour': '1 hour',
    'time.1.5hours': '1.5 hours', 
    'time.2hours': '2 hours',
    'time.3hours': '3 hours',
    'time.4hours': '4 hours',

    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.required': 'Required',
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
    
    // Dashboard
    'dashboard.title': '仪表板',
    'dashboard.welcomeElder': '您的活动概览',
    'dashboard.welcomeVolunteer': '社区动态',
    'dashboard.myRequests': '我的请求',
    'dashboard.availableRequests': '可用请求',
    'dashboard.tasksCompleted': '已完成任务',
    'dashboard.peopleHelped': '帮助的人',
    'dashboard.newMessages': '新消息',
    'dashboard.yourRating': '您的评分',
    'dashboard.myRecentRequests': '我的最近请求',
    'dashboard.recentCommunityRequests': '最近的社区请求',
    'dashboard.quickActions': '快速操作',
    'dashboard.requestHelp': '请求帮助',
    'dashboard.requestHelpDesc': '发布新的援助请求',
    'dashboard.viewMessages': '查看消息',
    'dashboard.viewMessagesDesc': '与志愿者聊天',
    'dashboard.updateProfile': '更新个人资料',
    'dashboard.updateProfileDesc': '管理您的偏好设置',
    'dashboard.browseRequests': '浏览请求',
    'dashboard.browseRequestsDesc': '寻找附近的帮助方式',
    'dashboard.myCommitments': '我的承诺',
    'dashboard.myCommitmentsDesc': '查看已接受的请求',
    'dashboard.updateAvailability': '更新可用性',
    'dashboard.updateAvailabilityDesc': '管理您的时间表',

    // Requests
    'requests.myRequests': '我的请求',
    'requests.availableRequests': '可用请求',
    'requests.manageRequests': '管理您的援助请求',
    'requests.browseHelp': '浏览并帮助社区请求',
    'requests.newRequest': '新请求',
    'requests.searchRequests': '搜索请求...',
    'requests.allCategories': '所有类别',
    'requests.offerHelp': '提供帮助',
    'requests.viewDetails': '查看详情',
    'requests.noRequests': '未找到符合您条件的请求。',
    'requests.createTitle': '创建新请求',
    'requests.requestTitle': '请求标题',
    'requests.requestTitlePlaceholder': '您需要什么帮助？',
    'requests.category': '类别',
    'requests.description': '描述',
    'requests.descriptionPlaceholder': '请提供更多关于您需要帮助的详细信息...',
    'requests.date': '日期',
    'requests.time': '时间',
    'requests.duration': '持续时间（分钟）',
    'requests.address': '地址',
    'requests.addressPlaceholder': '您在哪里需要帮助？',
    'requests.postalCode': '邮政编码',
    'requests.urgency': '紧急程度',
    'requests.lowPriority': '低优先级',
    'requests.mediumPriority': '中优先级',
    'requests.highPriority': '高优先级',
    'requests.creating': '创建中...',
    'requests.createRequest': '创建请求',
    'requests.status.open': '开放',
    'requests.status.matched': '已匹配',
    'requests.status.completed': '已完成',
    'requests.status.inProgress': '进行中',
    'requests.matchedWith': '与志愿者匹配',

    // Profile
    'profile.title': '个人资料',
    'profile.elderMember': '长者会员',
    'profile.volunteerMember': '志愿者会员',
    'profile.personalInfo': '个人信息',
    'profile.name': '姓名',
    'profile.email': '电子邮件',
    'profile.phone': '电话',
    'profile.address': '地址',
    'profile.bio': '简介',
    'profile.languages': '语言',
    'profile.age': '年龄',
    'profile.servicesOffered': '提供的服务',
    'profile.availability': '可用性',
    'profile.emergencyContact': '紧急联系人',
    'profile.relationship': '关系',
    'profile.phoneNumber': '电话号码',

    // Accessibility
    'accessibility.switchLanguage': '切换语言',
    'accessibility.toggleFontSize': '切换字体大小',

    // Time
    'time.30min': '30分钟',
    'time.1hour': '1小时',
    'time.1.5hours': '1.5小时',
    'time.2hours': '2小时',
    'time.3hours': '3小时',
    'time.4hours': '4小时',

    // Common
    'common.loading': '加载中...',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.all': '全部',
    'common.required': '必填',
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