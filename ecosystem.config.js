const HomeEnv = require("./src/config/envirenment/Home.js");
const OfficeEnv = require("./src/config/envirenment/Office.js");

module.exports = {
  apps: [
    // main API settings
    {
      script: "./src/index.js",
      args: "--trace-warnings",
      name: "server",
      instances: "2",
      exec_mode: "cluster",
      watching: ".",
      ignore_watch: ["node_modules", ".git/*", ".idea/*"],
      env_Home: { ...HomeEnv },
      env_Office: { ...OfficeEnv },
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};