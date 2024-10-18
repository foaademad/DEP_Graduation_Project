//* translation:  */
let currentTheme = 'light';

let currentLanguage = 'en';


const translations = {
    en: {

       

    },
    ar: {
        



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
