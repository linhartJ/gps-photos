// only temporary build script untill dev stack is in place
const fs = require('fs');
const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
const buildDir = "./build";
deleteFolderRecursive(buildDir);
fs.mkdirSync(buildDir);
let sourceDir = "./src/main/";
fs.copyFileSync(sourceDir + "index.html", buildDir + "/index.html");
fs.copyFileSync(sourceDir + "/js/main.js", buildDir + "/main.js");
fs.copyFileSync("package.json", buildDir + "/package.json");
