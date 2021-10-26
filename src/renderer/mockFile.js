import {getFilename} from "./fileUtils.js";

/**
 * Mock object for browser 'File' class
 */

class MockFile {

    constructor(path) {
    	this.path = path;
    	this.name = getFilename(path);
    }

	/**
	 * Returns a new Blob object containing the data in the specified range of bytes of the blob on which it's called.
	 * @param start An index into the Blob indicating the first byte to include in the new Blob
	 * @param end  An index into the Blob indicating the first byte that will *not* be included in the new Blob
	 * @param contentType
	 * @returns {*}
	 */
    slice(start, end, contentType) {
    	const arrayBuffer = window.api.slice(this.path, start, end);
    	return new Blob([arrayBuffer]);
    }

	/**
	 * Returns a promise that resolves with an ArrayBuffer containing the entire contents of the Blob as binary data.
	 *
	 * @returns {Promise<*>}
	 */
	async arrayBuffer() {
		return window.api.read(this.path);
    }

	/**
	 * Returns a promise that resolves with a USVString containing the entire contents of the Blob interpreted as UTF-8 text.
	 *
	 * @returns {Promise<string>}
	 */
	async text() {
    }

    stream() {
    }
}


export default MockFile;
