// @flow
/* eslint-disable spaced-comment */

const fs = require("fs");

const { chalk, log } = require("distraught");

function autoprefix(css /*: string */) {
  return require("postcss")([require("autoprefixer")])
    .process(css)
    .then((postcssResult) => {
      postcssResult.warnings().forEach((warn) => {
        log(chalk.white.bold(warn.toString()));
      });

      return postcssResult.css;
    });
}

function minify(css /*: string */) {
  return require("csso").minify(css).css;
}

function writeToFile(css /*: string */) {
  fs.writeFile("server/web/public/css/main.css", css, (err) => {
    if (err) {
      throw err;
    }

    log(chalk.green.bold("CSS updated"));
  });
}

setTimeout(function() {
  const transpiledSass = transpileSass();

  autoprefix(transpiledSass).then((autoprefixedCSS) => {
    const minifiedCSS = minify(autoprefixedCSS);
    return writeToFile(minifiedCSS);
  });
}, 1);

/* eslint-enable spaced-comment */
