//* translation:  */
let currentTheme = 'light';

let currentLanguage = 'en';


const translations = {
    en: {
        navHome: "Home",
        navAbout: "About",
        navOurTravel: "Our Travel",
        navHoneymoonPackages: "Honeymoon Packages",
        navToursPackages: "Tours Packages",
        navMusicalEvents: "Musical Events",
        navBuildPackage: "Build Package",
        navBuildYourOwnPackage: "Build Your Own Package",
        navEnterDestination: "Enter destination (country, region or city)",
        navTwoAdults: "2 adults",
        navOneAdult: "1 adult",
        navThreeAdults: "3 adults",
        navFourAdults: "4 adults",
        navActivitiesPreferences: "Activities preferences (optional)",
        navCulture: "Culture",
        navOutdoors: "Outdoors",
        navRelaxing: "Relaxing",
        navWildlife: "Wildlife",
        navRomantic: "Romantic",
        navReligious: "Religious",
        navHiking: "Hiking",
        navMusical: "Musical",
        navShopping: "Shopping",
        navBusiness: "Business",
        navMuseums: "Museums",
        navParty: "Party",
        navTraditions: "Traditions",
        navWalks: "Walks",
        navFishing: "Fishing",
        navCruise: "Cruise",
        navExplore: "Explore",
        navUpcomingTravel: "Upcoming Travel",
        navLoginForm: "Login Form",
        navSignInToAccount: "Sign in to your account",
        navEmail: "Email",
        navPassword: "Password",
        navForgotYourPassword: "Forgot your password?",
        navLoginAsAdmin: "Login As Admin",
        navDontHaveAnAccount: "Don't have an account?",
        navSignUp: "Sign up",
        navMakeANewAccount: "Make a new account",
        navConfirmPassword: "Confirm Password",
        navAlreadyHaveAnAccount: "Already have an account?",
        navUsername: "Username",
        navLogin: "Login",
    },
    ar: {
        navHome: "الصفحة الرئيسية",
        navAbout: "حول",
        navOurTravel: "رحلاتنا",
        navHoneymoonPackages: "باقات شهر العسل",
        navToursPackages: "الرحلات",
        navMusicalEvents: "الفعاليات الموسيقية",
        navBuildPackage: "إنشاء رحلة",
        navBuildYourOwnPackage: "إنشاء باقتك الخاصة",
        navEnterDestination: "أدخل الوجهة (البلد، المنطقة أو المدينة)",
        navTwoAdults: "2 بالغين",
        navOneAdult: "1 بالغ",
        navThreeAdults: "3 بالغين",
        navFourAdults: "4 بالغين",
        navActivitiesPreferences: "تفضيلات الأنشطة (اختياري)",
        navCulture: "ثقافة",
        navOutdoors: "الأنشطة الخارجية",
        navRelaxing: "استرخاء",
        navWildlife: "الحياة البرية",
        navRomantic: "رومانسي",
        navReligious: "ديني",
        navHiking: "المشي لمسافات طويلة",
        navMusical: "موسيقي",
        navShopping: "تسوق",
        navBusiness: "أعمال",
        navMuseums: "متاحف",
        navParty: "حفلة",
        navTraditions: "تقاليد",
        navWalks: "نزهات",
        navFishing: "صيد الأسماك",
        navCruise: "رحلة بحرية",
        navExplore: "استكشاف",
        navUpcomingTravel: "السفر القادم",
        navLoginForm: "نموذج تسجيل الدخول",
        navSignInToAccount: "تسجيل الدخول إلى حسابك",
        navEmail: "البريد الإلكتروني",
        navPassword: "كلمة المرور",
        navForgotYourPassword: "نسيت كلمة المرور؟",
        navLoginAsAdmin: "تسجيل الدخول كمسؤول",
        navDontHaveAnAccount: "ليس لديك حساب؟",
        navSignUp: "إنشاء حساب",
        navMakeANewAccount: "إنشاء حساب جديد",
        navConfirmPassword: "تأكيد كلمة المرور",
        navAlreadyHaveAnAccount: "هل لديك حساب بالفعل؟",
        navUsername: "اسم المستخدم",
        navLogin: "تسجيل الدخول",
        
        
        
    },

};

function setLanguage(language) {
    const textElements = translations[language];

     // العثور على جميع العناصر التي تحتوي على خاصية data-translate
        const translateElements = document.querySelectorAll("[data-translate]");

        translateElements.forEach((element) => {
            const keyOfLanguage = element.getAttribute("data-translate"); // الحصول على المفتاح
            if (textElements[keyOfLanguage]) {
                element.textContent = textElements[keyOfLanguage]; // تعيين النص بناءً على المفتاح
            }
        });
    currentLanguage = language; // Update the current language
    localStorage.setItem("language", language); // تخزين اللغة المختارة في localStorage

    const dropdowns = document.querySelectorAll(".dropdown-menu");

    if (language === "ar") {
        document.documentElement.setAttribute("lang", "ar");
        document.body.dir = "rtl";
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("dropdown-menu-lg-end");
            dropdown.classList.add("dropdown-menu-lg-start");
        });
    } else {
        document.documentElement.setAttribute("lang", "en");
        document.body.dir = "ltr";
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("dropdown-menu-lg-start");
            dropdown.classList.add("dropdown-menu-lg-end");
        });
    }
}

//* themes:  */
// function toggleTheme() {
//    // تحقق من الثيم الحالي وقم بالتبديل بين 'dark' و 'light'
// let currentTheme = document.documentElement.getAttribute("data-bs-theme");
// currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

// // تغيير الثيم في الـ DOM
// document.documentElement.setAttribute("data-bs-theme", currentTheme);

// // تغيير أيقونة الثيم
// document.getElementById("theme-icon").className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// // تخزين الثيم الجديد في Local Storage
// localStorage.setItem("theme", currentTheme);


// }

// استعادة اللغة المخزنة عند تحميل الصفحة
window.onload = function() {
    const savedLanguage = localStorage.getItem("language") || "en"; // استخدام اللغة المحفوظة أو الافتراضية (en)
    setLanguage(savedLanguage);

    // // استعادة ثيم المخزن عند تحميل الصفحة
    // const savedTheme = localStorage.getItem("theme") || 'dark'; // استخدام الثيم المخزن أو الافتراضي (dark)

    // // تعيين الثيم على الصفحة
    // document.documentElement.setAttribute("data-bs-theme", savedTheme);

    // // تحديث أيقونة الثيم بناءً على الثيم المخزن
    // document.getElementById("theme-icon").className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

};
