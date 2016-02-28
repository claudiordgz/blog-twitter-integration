function load(environmentName) {
    return require('./env/' + environmentName);
}

module.exports = {
    load: load
};