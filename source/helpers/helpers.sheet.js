const helpers = {

    // The alert system is a way to display pop-up on top of the sheet to notify players
    alerter: {
        // This is set from the PUG, there is an assignement after this const helper block
        alerts: [],
        attributeName: null,


        showAlert({ name, attributes }) {
            if (helpers.alerter.alerts.indexOf(name) === -1) {
                k.log(`Cannot show alert '${name}': undefined alert`);
            } else {
                k.log(`Showing alert '${name}'...`);
                $20(`.alert--${name}`).removeClass("hidden");
                const state = JSON.parse(attributes[helpers.alerter.attributeName]);
                state[name] = true;
                attributes[helpers.alerter.attributeName] = JSON.stringify(state);
                k.log(`Showing alert '${name}': done`);
            }
        },

        hideAlert({ name, attributes }) {
            if (helpers.alerter.alerts.indexOf(name) === -1) {
                k.log(`Cannot show alert '${name}': undefined alert`);
            } else {
                k.log(`Hidding alert '${name}'...`);
                $20(`.alert--${name}`).addClass("hidden");
                const state = JSON.parse(attributes[helpers.alerter.attributeName]);
                state[name] = false;
                attributes[helpers.alerter.attributeName] = JSON.stringify(state);
                k.log(`Hidding alert '${name}': done`);
            }
        },

        close({ trigger, attributes }) {
            const name = trigger.name.match(/alert-close-(.+)/)[1];
            helpers.alerter.hideAlert({ name, attributes });
        },

        onOpen({ attributes }) {
            const state = JSON.parse(attributes[helpers.alerter.attributeName]);
            helpers.alerter.alerts.forEach(name => {
                if (name in state && state[name]) {
                    helpers.alerter.showAlert({ name, attributes });
                } else {
                    state[name] = false;
                }
            });
            attributes[helpers.alerter.attributeName] = JSON.stringify(state);
        }
    }
};

k.registerFuncs({ "helpers.alerter.close": arm5.sheet.alerts.close });
k.registerFuncs({ "helpers.alerter.onOpen": arm5.sheet.alerts.onOpen }, { type: ["opener"] });