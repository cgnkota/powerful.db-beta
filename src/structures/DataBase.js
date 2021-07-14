'use strict'

const {exists, read, append, write} = require('../utils/Helpers');

/**
 * @returns {boolean}
 */
Array.prototype.isArray = () => {
    return Object.prototype.toString.call(this) === '[object Array]';
}

class DataBase {
    /**
     * @param file
     */
    constructor(file) {
        if (!file || typeof file != 'string') throw new Error('Oops! File type must be a string.');
        if (!file.endsWith('.json')) throw new Error('Your file type is invalid. File type must be json format.');

        if (!exists(file)) return append(file);

        /**
         * @type {string}
         */
        this.file = file;

        /**
         * @type {any}
         */
        this.data = read(file);
    }

    /**
     * @param entries
     * @param value
     */
    set(entries, value) {
        if (!entries || !value) throw new Error('You have to write entries and value.');

        this.data[entries] = value;

        return write(this.file, JSON.stringify(this.data, null, 2));
    }

    /**
     * @param entries
     * @param option
     * @returns {*}
     */
    get(entries, option = null) {
        if (!entries) throw new Error('You have to write entries. If you want to search option of this entries, you can write option. For example: `db.get(\'database\', \'firstDB\')` Output: \'{firstDB: \'value\'}\'');

        if (option !== null) {
            return this.data[entries][option];
        } else {
            return this.data[entries];
        }
    }

    /**
     * @param entries
     * @param value
     * @returns {boolean}
     */
    has(entries, value = null) {
        if (!entries) throw new Error('You have to write entries and value.');

        if (value !== null) {
            return !!this.data[entries][value];
        } else {
            return !!this.data[entries];
        }
    }

    /**
      * @returns {*}
     */
    getAll() {
        return this.data;
    }

    /**
     * @param entries
     * @param count
     * @param option
     */
    add(entries, count, option = null) {
        if (!entries || !count) throw new Error('You have to write entries and count. Maybe option.');
        if (isNaN(count)) throw new Error('Invalid count.');

        if (option !== null) {
            if (this.data[entries][option] === undefined) {
                this.data[entries][option] = Number(count);

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                if (Number(this.data[entries][option])) {
                    this.data[entries][option] = (Number(this.data[entries][option]) + Number(count)).toString();

                    return write(this.file, JSON.stringify(this.data, null, 2));
                } else {
                    throw new Error('Value type is not number.');
                }
            }
        } else {
            if (this.data[entries] === undefined) {
                this.data[entries] = Number(count);

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                if (Number(this.data[entries])) {
                    this.data[entries] = (Number(this.data[entries]) + Number(count)).toString();

                    return write(this.file, JSON.stringify(this.data, null, 2));
                } else {
                    throw new Error('Value type is not number.');
                }
            }
        }
    }

    /**
     * @param entries
     * @param count
     * @param option
     */
    subtract(entries, count, option = null) {
        if (!entries || !count) throw new Error('You have to write entries and count. Maybe option.');
        if (isNaN(count)) throw new Error('Invalid count.');

        if (option !== null) {
            this.data[entries][option] = (Number(this.data[entries][option]) - Number(count)).toString();

            return write(this.file, JSON.stringify(this.data, null, 2));
        } else {
            if (Number(this.data[entries])) {
                this.data[entries] = (Number(this.data[entries]) - Number(count)).toString();

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                throw new Error('Value type is not number.');
            }
        }
    }

    /**
     * @param entries
     */
    delete(entries) {
        if (!entries) throw new Error('You have to write entries.');
        if (!this.data[entries]) throw new Error('I cannot find this entries. Please try another entries.');

        delete this.data[entries];

        return write(this.file, JSON.stringify(this.data, null, 2));
    }

    /**
     * @returns {any}
     */
    deleteAll() {
        return write(this.file, '{}');
    }

    /**
     * @param entries
     * @param value
     * @param option
     */
    push(entries, value, option = null) {
        if (!entries || !value) throw new Error('You have to write entries and value. Maybe option.');

        if (option !== null) {
            if (this.data[entries][option] !== undefined) {
                this.data[entries][option] = [this.data[entries][option], value];

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                this.data[entries][option] = [value];

                return write(this.file, JSON.stringify(this.data, null, 2));
            }
        } else {
            if (this.data[entries] !== undefined) {
                this.data[entries] = [this.data[entries], value];

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                this.data[entries] = [value];

                return write(this.file, JSON.stringify(this.data, null, 2));
            }
        }
    }

    /**
     * @param entries
     * @param value
     * @param option
     */
    removeArray(entries, value, option = null) {
        if (!entries || !value) throw new Error('You have to write entries and value. Maybe option.');

        if (option !== null) {
            if (this.data[entries][option] !== undefined) {


                if (this.data[entries][option].isArray()) throw new Error('This entries is not an array');
                if (!this.data[entries][option].includes(value)) throw new Error('This array is not include this value.');

                const index = this.data[entries][option].indexOf(value);
                this.data[entries][option].splice(index, 1);

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                throw new Error('Cannot find entries.');
            }
        } else {
            if (this.data[entries] !== undefined) {


                if (this.data[entries].isArray()) throw new Error('This entries is not an array');
                if (!this.data[entries].includes(value)) throw new Error('This array is not include this value.');

                const index = this.data[entries].indexOf(value);
                this.data[entries].splice(index, 1);

                return write(this.file, JSON.stringify(this.data, null, 2));
            } else {
                throw new Error('Cannot find entries.');
            }
        }
    }

    /**
     * @param entries
     * @param option
     * @returns {"undefined"|"object"|"boolean"|"number"|"string"|"symbol"|"bigint"}
     */
    type(entries, option = null) {
        if (!entries) throw new Error('You have to write entries. Maybe option.');

        if (option !== null) {
            if (!this.data[entries][option]) throw new Error('Cannot find this entries.');

            return typeof this.data[entries][option];
        } else {
            if (!this.data[entries]) throw new Error('Cannot find this entries.');

            return typeof this.data[entries];
        }
    }
}

module.exports = DataBase;
