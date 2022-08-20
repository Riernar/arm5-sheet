RollTemplate
    = "&{template:" name:Name "}" fields:Fields {
        return {type:"rolltemplate", fields:fields};
    }

Fields
    = fields:(Field*) {
        return Object.fromEntries(fields);
    }

Field
    = "{{" @FieldName "=" @RollOrString "}}"

FieldName
    // The Roll Template syntax is sensitive to spaces, so disallow them
    = [^|{}\[\]\(\)= \t\n\r]+ {
        return text();
    }

RollOrString
    = InlineRoll
    / (!"}}" .)+ {
        return {type:"string", value:text()};
    }

InlineRoll
    = "[[" roll:Roll "]]"

Number
    = Integer
    / InlineRoll
    / Attribute

Dice
    = Number "d" Number



Attribute
    = "@{" character:((Name "|")?) name:Name max:("|max"?)  "}" {
        return {type:"attribute", character:character, name:name, max:max};
    }

Name "Name"
    = [^|{}\[\]\(\)=]+ {
        return text();
    }
    
Integer "integer"
    = [0-9]+ {
        return parseInt(text(), 10);
    }

_ "whitespace"
    = [ \t\n\r]*