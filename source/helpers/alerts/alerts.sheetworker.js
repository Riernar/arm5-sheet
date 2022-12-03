

arm5.system = arm5.system || {};
arm5.system.alerts = {
    showAlert(id) {
        // Use Roll20's jQuery to show the alert
        $20().addClass();
    },

    hideAlert(id) {
        // Use Roll20's jQuery to show the alert
        $20().addClass();
    },

    closeAlertCallback({trigger}) {
        const alert_id = trigger.name.match(/alert-close-(.+)/)[1];
        this.hideAlert(alert_id);
    },
}