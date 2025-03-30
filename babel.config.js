module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        
        'module-resolver',
        {
          root: ['./app'], // Ajusta según la carpeta principal de tu proyecto
          alias: {
            '@': './app', // Este es tu alias
          },
        },
      ],
    ],
  };
  