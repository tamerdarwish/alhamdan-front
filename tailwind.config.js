// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // تأكد من أن جميع الملفات ذات الامتداد js و jsx مشمولة
  ],
  theme: {
    extend: {
      fontFamily: {
        'ruqaa': ['Amiri', 'serif'], // إضافة خط الرقعة
        'tajawal': ['Tajawal', 'sans-serif'], // إضافة خط تجول
      },
    },
  },
  plugins: [],
}
