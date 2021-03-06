const postcss = require('postcss');
const fs = require('fs/promises');

const logSize = require('../../../utils/logSize');

class Page {
  data() {
    return {
      permalink: '/assets/tailwind.css',
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    const source = `${__dirname}/tailwind.css`;

    let plugins = [require('tailwindcss'), require('autoprefixer')];

    if (process.env.NODE_ENV === 'production') {
      plugins = [...plugins, require('cssnano')];
    }

    const css = await postcss(plugins).process(await fs.readFile(source), {
      from: source,
      to: undefined,
    });

    logSize(css.content.length, 'tailwind.css');

    return css.content;
  }
}

module.exports = Page;
