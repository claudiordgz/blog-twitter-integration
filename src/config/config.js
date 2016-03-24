export function loadConfiguration(environmentName) {
  return require('./env/' + environmentName);
}
