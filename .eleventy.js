const CleanCss = require("clean-css");
const HtmlMin = require("html-minifier");

module.exports = function (config) {
  config.addPassthroughCopy("src/favicon.ico");

  config.addTransform("htmlmin", function (content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      let minified = HtmlMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  config.addFilter("cssmin", function (code) {
    return new CleanCss({}).minify(code).styles;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
