
(
    function registerTabHandlers(storage) {
        Object.entries(storage).forEach(
            ([name, data]) => {
                console.log(`Registering handler for tab ${name}`);
                $20(`.tab.tab-${name} .tab-header.tab-header-${name} .tab-button.tab-button-${name}`).on("click", (event) => {
                    console.log("clicked:");
                    console.log(event.htmlAttributes);
                    const tab = event.htmlAttributes["data-tab"];
                    console.log(`$20(.tab.tab-${name} div[data-tab]).removeClass("active");`);
                    $20(`.tab.tab-${name} div[data-tab]`).removeClass("active");
                    console.log(`$20(.tab.tab-${name} div[data-tab=${tab}]).addClass("active");`);
                    $20(`.tab.tab-${name} div[data-tab=${tab}]`).addClass("active");
                });
            }
        );
    }
)(tabsStorage);