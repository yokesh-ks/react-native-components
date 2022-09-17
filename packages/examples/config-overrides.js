const {
  override,
  addExternalBabelPlugin,
  addWebpackAlias,
  fixBabelImports,
} = require("customize-cra");

const appIncludes = [resolveApp("src"), resolveApp("../components")];

const addConfig = (config, env) => {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
  );

  config.module.rules[0].include = appIncludes;
  config.module.rules[1].oneOf[2].include = appIncludes;
  config.module.rules[1].oneOf[2].options.plugins.push(
    require.resolve("babel-plugin-react-native-web")
  );
  config.module.rules[0].include = appIncludes;

  return config;
};

module.exports = override(
  addConfig,
  fixBabelImports("module-resolver", {
    alias: {
      "^react-native$": "react-native-web",
    },
  }),
  addExternalBabelPlugin("@babel/plugin-proposal-class-properties", {
    loose: true,
  }),
  addExternalBabelPlugin("@babel/plugin-transform-react-jsx"),
  addWebpackAlias({
    "react-native": "react-native-web",
    "react-native-linear-gradient": "react-native-web-linear-gradient",
  })
);
