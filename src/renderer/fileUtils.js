/**
 * Return the filename from the path.   Example
 *   https://foo.com/bar.bed?param=2   => bar.bed
 * @param path
 */

function getFilename(path) {


	let index = path.lastIndexOf("/");
	let filename = index < 0 ? path : path.substr(index + 1);

	//Strip parameters -- handle local files later
	index = filename.indexOf("?");
	if (index > 0) {
		filename = filename.substr(0, index);
	}
	return filename;

}


export {getFilename}
