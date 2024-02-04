module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@react-native-voice/voice"],
      ["react-native-reanimated/plugin"],
    ],
  };
};
