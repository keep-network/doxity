'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import Config from 'truffle-config';
// import Resolver from 'truffle-resolver';
// import compile from 'truffle-compile';

exports.default = function (src, mappings, allowPaths) {
  // detect if we're in a truffle project
  return new Promise(function (resolve) {
    // if (fs.existsSync(`${process.env.PWD}/truffle.js`)) {
    //   const config = Config.default();
    //   config.resolver = new Resolver(config);
    //   config.rawData = true;
    //   compile.all(config, (err, res) => {
    //     if (err) { throw err; }
    //     resolve({
    //       contracts: Object.keys(res).reduce((o, k) => {
    //         const { metadata, ...data } = res[k].rawData;
    //         try {
    //           const parsed = JSON.parse(metadata);
    //           const fN = Object.keys(parsed.settings.compilationTarget)[0];
    //           data.fileName = fN.indexOf(process.env.PWD) === 0 ? fN : `${process.env.PWD}/node_modules/${fN}`;
    //           data.output = parsed.output;
    //         } catch (e) {
    //           console.log(`⚠️ Error parsing Contract: ${k}`);
    //         }
    //         return {
    //           ...o,
    //           [k]: data,
    //         };
    //       }, {}),
    //     });
    //   });
    // } else {
    var exec = 'solc ' + mappings + ' ' + (allowPaths ? '--allow-paths ' + allowPaths : "") + ' --combined-json abi,asm,ast,bin,bin-runtime,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc ' + src;
    var res = JSON.parse(_child_process2.default.execSync(exec));
    resolve({
      contracts: Object.keys(res.contracts).reduce(function (o, k) {
        var file = k.split(':')[0];
        var fileFragments = file.split('/');
        var contractName = fileFragments[fileFragments.length - 1].split('.sol')[0];
        var contract = res.contracts[k];
        var fileName = process.env.PWD + '/' + k.split(':')[0];
        return _extends({}, o, _defineProperty({}, contractName, _extends({}, contract, {
          fileName: fileName,
          abi: JSON.parse(contract.abi),
          devdoc: JSON.parse(contract.devdoc),
          userdoc: JSON.parse(contract.userdoc)
        })));
      }, {})
    });
    // }
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }