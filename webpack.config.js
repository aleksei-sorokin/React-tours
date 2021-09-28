const path = require('path');

const { NODE_ENV } = process.env
const inDevelopment = NODE_ENV === "development";

module.exports = { 
    entry: "./src/index.jsx", // основной файл приложения
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого файла
    }, 
    devtool:'source-map',
    module:{ 
        rules:[
            { 
                test: /\.(js|jsx)$/, // какие файлы обрабатывать
                exclude: !inDevelopment ? /node_modules\/(?!(@atlaskit\/tooltip))/ : /(node_modules)/, // какие файлы пропускать
                use: { loader: "babel-loader" },
                options: {
                    cacheDirectory: inDevelopment,
                    cacheCompression: false,
                }
            }
        ] 
    },
    plugins: [
        extractCSS
    ]
}