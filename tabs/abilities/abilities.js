function addShapeshift({ attributes, trigger }) {
    k.getAllAttrs({
        callback: (attributes, sections, casc) => {
            const newRowID = k.generateRowID("repeating_shapeshifts", sections);
            console.log("Added repeating_shapeshifts rowId: " + newRowID);
            const newAttributeName = newRowID + "_shapeshift_name";
            const newAttributes = {};
            newAttributes[newAttributeName] = "New shapeshift"
            k.setAttrs(newAttributes);

        }
    });
    
}

function removeShapeshift({ attributes, trigger }) {
    console.log("Removed repeating_shapeshifts rowId: <unknown>");
}

k.registerFuncs({ addShapeshift });
k.registerFuncs({ removeShapeshift });
