#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const Batch = require('stream-json/utils/Batch');
const StreamArray = require('stream-json/streamers/StreamArray');
const Utf8Stream = require('stream-json/utils/Utf8Stream');
const utf8Stream = new Utf8Stream();
const fs = require('fs');
const argv = yargs(hideBin(process.argv)).argv
const { exitProcess } = require('yargs');
if (argv.id) {
    const pipeline = fs.createReadStream('input.json')
        .pipe(utf8Stream)
        .pipe(StreamArray.withParser())
        .pipe(new Batch({batchSize: argv.batchSize}));
    let matchedData;
    pipeline.on('data', (data) => {
        matchedData = data.find(obj => obj.value.id == argv.id);
        if (matchedData && matchedData.value.name) {
            console.log(matchedData.value.name);
            pipeline.destroy();
        }
    });
} else {
    exitProcess(true);
}