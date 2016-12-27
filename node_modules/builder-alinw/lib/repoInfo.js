/**
 * 获取gitlab仓库信息
 */
var fs = require('fs');

module.exports = function getRepoInfo(options){
    var repo = options.repo;
    var branch = options.branch;
    var result = {};
    var defaultGroup = 'platform';
    var defaultName = 'test';
    var defaultVersion = '0.1.0';
    try {
        var pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        defaultGroup = pkg.family;
        defaultName = pkg.name;
        defaultVersion = pkg.version;
        result.spm = pkg.spm;
    } catch (e) {
    }
    try {
        var head = fs.readFileSync('.git/HEAD', 'utf-8');
        var version = head.replace(/\s+$/g, '').split('/').pop();
        if (defaultVersion && defaultVersion != version) {
            console.error('Verions not match! (' + defaultVersion + ' in package.json & ' + version + ' in git branch)');
            process.exit();
        }
    } catch (e) {
    }
    var repoRet = /gitlab\.alibaba-inc\.com[\/\:]{1}(.*)\/(.*)\.git/g.exec(repo);
    result.group = repoRet ? repoRet[1] : defaultGroup;
    result.name = repoRet ? repoRet[2] : defaultName;
    var versionMatch = /(daily|publish)\/([\d\.]+)/g.exec(branch);
    result.version = versionMatch? versionMatch[2] : defaultVersion;
    result.type = versionMatch ? versionMatch[1] : undefined;
    result.isPublish = versionMatch ? versionMatch[1] === 'publish' : false;
    return result;
};