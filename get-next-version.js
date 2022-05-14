const semver = require('semver');
const git = require('isomorphic-git');
const fs = require('fs');

async function getNextVersion() {
    const tags = await git.listTags({ fs, dir: process.cwd() });
    if (!tags.length) {
        console.log('no tags found!');
        return;
    }

    const lastVersion = tags[tags.length - 1];

    const patch = semver.patch(lastVersion);
    const minor = semver.minor(lastVersion);

    let newVersion = semver.inc(lastVersion, 'patch');

    if (patch === 99) {
        newVersion = semver.inc(lastVersion, 'minor');
    }

    if (minor === 99 && patch === 99) {
        newVersion = semver.inc(lastVersion, 'major');
    }

    console.log(newVersion);
}

getNextVersion();
