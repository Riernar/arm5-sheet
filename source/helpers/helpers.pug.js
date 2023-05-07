const helpers = {

    //- This helper makes it easier to run multiple update functions
    //- when the sheet is opened in Roll20 VTT
    //- It is used to incrementally update the internal state of the sheet
    //- in the VTT to update it to the latest version
    //- For instance, if the sheet source code has received 3 updates since
    //- you last opened Roll20, your character sheet needs to go through
    //- the three updates in order.
    //- This is what this helper does

    //- See also the rest of the system implemented in source/helpers/helpers.sheet.js
    //- Which is run in the VTT
    updater: {
        //- The version of the sheet
        version: null,
        //- A memory of which functions to run to update to a given version and their arguments
        //- This needs to be persisted to the VTT sheet using the transfer_data_to_sheet()
        //- PUG mixin
        update_funcs: {},

        //- Register a function to be run when updating the sheet to a version
        registerUpdateFunc({ version, func_name, args = null }) {
            const array = helpers.updater.update_funcs[version] || [];
            array.push({ func_name, args });
            helpers.updater.update_funcs[version] = array;
        },

        //- Generate the source code that tells K-Scaffold what version of the sheet we're in
        generateVersion() {
            if (helpers.updater.version === null) {
                throw new Error("The version was not set within the PUG of the sheet");
            }
            let version = JSON.stringify(helpers.updater.version);
            if (!version.startsWith('"')) {
                version = `"${version}"`;
            }
            return `k.version = ${version};`;
        },

        //- Transfer the registerered functions to the VTT-runtime
        //- We use this instead of +transfer_data_to_sheet() to be able
        //- to write the function names inline, instead of strings
        generateSheetCode() {
            //- Generate a call to the helpers.updater.registerUpdatersToKScaffold() on the sheet-side of the code
            //- We don't simply used a JSON.stringify, because helpers.updater.update_funcs contains function
            //- names we need to convert to actual references instead of strings
            const versions_array = [];
            for (const [version, calls] of Object.entries(helpers.updater.update_funcs)) {
                let calls_array = [];
                for (const call of calls) {
                    calls_array.push(`    {func: ${call.func_name}, args: ${call.args}}`);
                    flatten.push({ version, ...obj });
                }
                versions_array.push([`  ${JSON.stringify(version)}: [\n`, calls_array.join(",\n"), "]"].join("\n"));
            }
            return ["helpers.updater.registerUpdatersToKScaffold({\n", versions_array.join(",\n"), "});"].join("\n");
        }
    },

    // The alert system is a way to display pop-up on top of the sheet to notify players
    alerter: {
        // List of alert IDs
        alerts: [],
        // The attribute of the sheet to use to store the state of the alert system
        attributeName: null,

    }

};

module.exports.helpers = helpers;