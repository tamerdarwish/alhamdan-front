module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // تخصيص إعدادات devServer هنا
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          setupMiddlewares: (middlewares, devServer) => {
            // أضف أو قم بتعديل الوسطاء (middlewares) هنا
            console.log("تم تهيئة middlewares");
            return middlewares;
          },
        };
        return webpackConfig;
      },
    },
  };
  