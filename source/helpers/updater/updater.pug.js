// Save persistent data to the sheet
arm5.pug.sheet_data.updater = {
    references: {}
}

arm5.pug.updater = {

    references: {},

    addUpdateRef(version, reference, args) {
        const array = references[version] || [];
        array.push({ reference, args });

    },

    generateSheetworkerRegistrations() {
        const flatten = [];
        for (const [version, references] of Object.entries(arm5.pug.updater.references)) {
            for (const obj of references) {
                flatten.push({ version, ...obj });
            }
        }
        return flatten.map(
            ({ version, reference, args }) => `arm5.updater.addUpdateFromRef(${JSON.stringify(version)}, ${JSON.stringify(reference)}, ${JSON.stringify(args)});`
        ).join("\n");
    }
}