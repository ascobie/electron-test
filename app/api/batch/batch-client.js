const electron = require('electron');
const { ipcRenderer, remote } = electron;

const batchClient = remote.getCurrentWindow().batchClient;
module.exports = batchClient;
