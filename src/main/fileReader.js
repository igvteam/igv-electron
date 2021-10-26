/**
 * Utility functions for reading a file.  These will be exposed in the main process API through preload for use by the
 * renderer process.
 *
 * @type {module:fs}
 */

const fs = require('fs')


/**
 * Returns a an array buffer containing the data in the specified range of bytes.
 * @param start An index  indicating the first byte to include
 * @param end  An index indicating the first byte that will *not* be included
 * @returns {ArrayBufferLike}
 */
function slice(path, start, end) {

	const fd = fs.openSync(path);
	try {
		const buffer = Buffer.alloc(end - start);
		fs.readSync(fd, buffer, 0, end - start, start);
		return buffer.buffer;

	} finally {
		fs.closeSync(fd);
	}
}

/**
 * Read the entire file.  Returns an array buffer.
 * @param path
 * @returns {ArrayBufferLike}
 */
function read(path) {
	return fs.readFileSync(path).buffer;
}

module.exports = {read, slice}
