
const indexExtensions = new Set(['bai', 'csi', 'tbi', 'idx', 'crai'])

const requireIndex = new Set(['bam', 'cram'])

function createTrackConfigs (paths) {

	// Search for index files  (.bai, .csi, .tbi, .idx)
	const indexLUT = new Map();
	const dataPaths = [];
	for(let path of paths) {

		const extension = getExtension(path)

		if (indexExtensions.has(extension)) {

			// key is the data file name
			const key = createIndexLUTKey(path, extension)
			indexLUT.set(key, path);
		} else {
			dataPaths.push(path);
		}

	}

	const configurations = [];
	for(let dataPath of dataPaths) {
		if (indexLUT.has(dataPath)) {
			const indexPath = indexLUT.get(dataPath)
			configurations.push({url: dataPath, indexURL: indexPath});
		} else if (requireIndex.has(getExtension(dataPath))) {
			throw new Error(`Unable to load track file ${ name } - you must select both ${ name } and its corresponding index file`)
		} else {
			configurations.push({ url: dataPath})
		}
	}
	return configurations;

}

const createIndexLUTKey = (name, extension) => {

	let key = name.substring(0, name.length - (extension.length + 1))

	// bam and cram files (.bai, .crai) have 2 conventions:
	// <data>.bam.bai
	// <data>.bai - we will support this one

	if('bai' === extension && !key.endsWith('bam')) {
		return `${ key }.bam`
	} else if('crai' === extension && !key.endsWith('cram')) {
		return `${ key }.cram`
	} else {
		return key
	}
}

function getExtension(filename) {

	//Strip parameters -- handle local files later
	let index = filename.indexOf("?");
	if (index > 0) {
		filename = filename.substr(0, index);
	}

	//Strip aux extensions .gz, .tab, and .txt
	if (filename.endsWith(".gz")) {
		filename = filename.substr(0, filename.length - 3);
	} else if (filename.endsWith(".txt") || filename.endsWith(".tab") || filename.endsWith(".bgz")) {
		filename = filename.substr(0, filename.length - 4);
	}

	index = filename.lastIndexOf(".");

	return index < 0 ? filename : filename.substr(1 + index);
}


module.exports = {createTrackConfigs};
