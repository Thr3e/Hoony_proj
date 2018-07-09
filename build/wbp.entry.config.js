const fileName = require('../build/filename.config')

exports.config = {
    main: './src/js/'+ fileName.config.indexJs,
    beds: './src/js/'+ fileName.config.bedsJs,
    tables: './src/js/'+ fileName.config.tablesJs,
    carts: './src/js/'+ fileName.config.cartsJs,
    more: './src/js/'+ fileName.config.moreJs,
    sofas: './src/js/'+ fileName.config.sofasJs,
    storage: './src/js/'+ fileName.config.storageJs,
    login: './src/js/'+ fileName.config.loginJs,
    userinfo: './src/js/'+ fileName.config.userinfoJs,
}