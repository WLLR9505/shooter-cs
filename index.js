process.title = 'MeuServidor';
var args = process.argv, port = args[2] || 3000,
webServer = require ('./server');

try {
    webServer.listen(port, () => {
        console.log('\x1b[01;32mServidor iniciado\x1b[0m');
        console.log(`\x1b[01;36mhttp://localhost:${port}/\x1b[0m`);
    });
} catch (e) {
    console.log('\x1b[01;31mOcorreu um erro!\x1b[0m');
    console.log(e);
}
