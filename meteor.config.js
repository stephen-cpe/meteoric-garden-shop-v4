// meteor.config.js

export default {
  // Configure Babel to properly transform import.meta for React 19+
  babel: {
    plugins: [
      ['@babel/plugin-transform-runtime', {
        "regenerator": true
      }],
      // For parsing import.meta syntax
      '@babel/plugin-syntax-import-meta',
      // For transforming import.meta to work in Node.js/Meteor
      ['babel-plugin-transform-import-meta', {
        "module": "meteor"
      }]
    ]
  },
  // Configure the build system
  buildOptions: {
    // Use modern module bundling
    minify: {
      enabled: true,
      minify: true
    }
  }
};