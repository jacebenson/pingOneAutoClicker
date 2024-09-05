// this will zip the contents of
// /src folder and create a .zip file named
// ${package.name}-${package.version}.zip
const fs = require('fs');
const archiver = require('archiver');
const package = require('./package.json');
const manifest = require('./src/manifest.json');
// we will update the version of the manifest
// to match the package.json version
manifest.version = package.version;
fs.writeFileSync('./src/manifest.json', JSON.stringify(manifest, null, 2));
// write the file to the /dist folder
// this should include the files in the /src folder
// i guess first ensure we have a /dist folder
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}
const output = fs.createWriteStream(`./dist/${package.name}-${package.version}.zip`);
const archive = archiver('zip');
output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.log(err);
  } else {
    throw err;
  }
});
archive.on('error', (err) => {
  throw err;
});
archive.pipe(output);
archive.directory('src/', false);
archive.finalize();
