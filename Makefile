SOURCE=source
BUILD=build

.PHONY: all

all: Ars_Magica_5th.html Ars_Magica_5th.css

%: $(BUILD)/%
	cp $< $@

$(BUILD)/Ars_Magica_5th.html: $(SOURCE)/*.pug

$(BUILD)/Ars_Magica_5th.css: $(SOURCE)/*.scss

$(SOURCE)/k-scaffold/_kpug.pug $(SOURCE)/k-scaffold/_k.scss:
	bash ./scripts/get_kscaffold.sh "$(SOURCE)/k-scaffold"

$(BUILD)/%.html: $(SOURCE)/%.pug $(SOURCE)/k-scaffold/_kpug.pug
	node scripts/compile-pug.js "$$(realpath "$<")" "$$(realpath "$@")"

$(BUILD)/%.css: $(SOURCE)/%.scss $(SOURCE)/k-scaffold/_k.scss
	node scripts/compile-scss.js "$$(realpath "$<")" "$$(realpath "$@")"

