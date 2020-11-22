const webpack       = require('webpack');
const path          = require('path');
const debug         = require('debug')('webpack');

if (!process.env['PALAPA_ENTRYPOINT']) {
  debug('Missing env variable PALAPA_ENTRYPOINT')
  process.exit(1);
}

debug(`Loading ${process.env['PALAPA_ENTRYPOINT']}`)

module.exports = (phase, { defaultConfig }) => {
  return {
    webpack: (config, options) => {
      console.log("Webpack...")

      // config.plugins.push(
      //   new webpack.ProvidePlugin({
      //     // Palapa:    [path.join(__dirname, 'palapa/index.ts'), ''],
      //     Palapafile: process.env['PALAPA_ENTRYPOINT']
      //   })
      // );

      // console.log(config);
      
      config.resolve.alias['palapafile'] = process.env['PALAPA_ENTRYPOINT'] //path.join(__dirname, 'palapa/index.ts');

      // config.plugins.push(
      //   new webpack.DefinePlugin({
      //     'testDefine': 'hello worold',
      //     'global.__palapafile': process.env['PALAPA_ENTRYPOINT']
      //   })
      // )

      // config.module.rules.push({
      //   test: /\.rb$/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env"],
      //         plugins: [
      //           [
      //             "@babel/plugin-transform-runtime",
      //             {
      //               helpers: false,
      //             },
      //           ],
      //         ],
      //       }
      //     },
      //     "rb2js-loader"
      //   ]
      // })
  
      // Important: return the modified config
      return config
    }
  }
}
