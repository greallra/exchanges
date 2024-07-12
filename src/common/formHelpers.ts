export function formatPostData (data: object) {
    let formattedData = {
        ...data,
        learningLanguageId: data.learningLanguage.id,
        teachingLanguageId: data.teachingLanguage.id,
    }
    delete formattedData.learningLanguage;
    delete formattedData.teachingLanguage;
    return formattedData;
}

export function updateFormFieldsWithSavedData(formFields: Array, savedData: object) {
    return formFields.map((field) => {
        // if data given to alter field contains field property and has a value, assign it to the field value
        const value = savedData[field.property];
        if (value) {
           field.value = value
        }
        return field
    })
}
export function updateFormFieldsWithDefaultData(formFields: Array, defaultData: object) {
    return formFields.map((field) => {
        // if data given to alter field contains field property and has a value, assign it to the field value
        const value = defaultData[field.property];
        if (value) {
           field.value = value
        }
        return field
    })
}