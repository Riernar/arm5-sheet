/**
 * Set the data in a +callout() construct.
 * 
 * @param {string} name - The name of the callout, as passed to the +callout() PUG mixin when generating the HTML.
 * @param {string} level  The level of the callout, one of "success", "info" (the default), "warning", "error". Can be empty or "-" to hide the callout, in which case `title` and `text` are ignored.
 * @param {string} title - The text to put in the title of the callout, after the level icon.
 * @param {string} text - The text to write as the content of the alert. Can contain newlines, as it is written to a textarea tag.
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 */
const setCallout = function ({ name, level = "info", title, text, attributes, _prefix = "" }) {
    // NOTE: repeating section prefix contain `-` in the RowID and must not be converted to snake_case
    const attr_level = _prefix + utils.toSnakeCase(`callout_${name}_level`);
    const attr_title = _prefix + utils.toSnakeCase(`callout_${name}_title`);
    const attr_text = _prefix + utils.toSnakeCase(`callout_${name}_text`);
    const changes = {}
    // NOTE: We support "-" because ?{} rollQueries cannot produce empty values, and we need a placeholder
    if ((level === "") || (level === "-")) {
        // Clear the callout
        changes[attr_level] = "";
        changes[attr_title] = "";
        changes[attr_text] = "";
    } else {
        const calloutLevels = ["info", "warning", "error", "success"];
        if (calloutLevels.indexOf(level) === -1) {
            throw new Error(`Invalid callout level "${level}", expected one of ${calloutLevels}`);
        }
        changes[attr_level] = level;
        changes[attr_title] = title;
        changes[attr_text] = text;
    }
    console.log({ event: "setCallout", ...changes });
    Object.assign(attributes, changes);
};

/**
 * Add a new callout entry in a +calloutFieldset construct.
 * @param {string} name - The name of the callout fieldset, as passed to the +calloutFieldset() PUG mixin when generating the HTML.
 * @param {string} level  The level of the callout to create, one of "success", "info" (the default), "warning", "error".
 * @param {string} title - The text to put in the title of the callout, after the level icon.
 * @param {string} text - The text to write as the content of the alert. Can contain newlines, as it is written to a textarea tag.
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 * @param {Object} sections - The `sections` object given by k-Scaffold that contains the sections of the sheet
 * @return {string} The *full* rowID of the created callout. WARNING: this RowID is a full rowID, with the format `repeating_callout-${name}_${rowID}`.
 */
const addCalloutEntry = function ({ name, level = "info", title, text, attributes, sections }) {
    name = utils.toKebabCase(`callout-${name}`);
    const sectionName = `repeating_${name}`;
    // NOTE: k.generateRowID also includes the section name in the returned value
    const rowID = k.generateRowID(sectionName, sections);
    setCallout({ name: "", level, title, text, attributes, _prefix: `${rowID}_` });
    console.log({ event: "createCalloutEntry", sectionName, rowID });
    return rowID;
};

/**
 * Remove an callout entry from a +calloutFieldset() construct. Called by default when clicking the close button of a repeating callout entry.
 * @param {object} trigger - The trigger object passed by K-Scaffold to callbacks. Used to infer `name` and `rowID` if passed, makes this function work as a K-Scaffold callback.
 * @param {string} name - The name of the callout fieldset, as passed to +calloutFieldset(). Ignored if `trigger` is passed.
 * @param {string} rowID - The (short) rowID of the row to delete, i.e. just the 20char-long unique row identifier starting with `-`. Ignored if `trigger` is passed.
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 * @param {Object} sections - The `sections` object given by k-Scaffold that contains the sections of the sheet
 * @return {string} The *full* rowID of the deeted callout. WARNING: this RowID is a full rowID, with the format `repeating_callout-${name}_${rowID}`.
 */
const deleteCalloutEntry = function ({ trigger, name, rowID, attributes, sections }) {
    const [sectionName, row, _] = (
        (trigger != null)
            ? k.parseTriggerName(trigger.name)
            : ["repeating_" + utils.toKebabCase(`callout-${name}`), rowID, null]
    );
    k.removeRepeatingRow(`${sectionName}_${row}`, attributes, sections);
    console.log({ event: "deleteCalloutEntry", trigger, name, rowID, row, sectionName });
};
k.registerFuncs({ deleteCalloutEntry });