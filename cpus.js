const logicalCpuCount = require('os').cpus();

var cpus= {cpus:logicalCpuCount};
console.log('Model: ' + cpus.cpus[0].model);
console.log('Length: ' + cpus.cpus.length);