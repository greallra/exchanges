export function formatPostData (data: object) {
    return {
        ...data,
        learningLanguage: data.learningLanguage.id,
        teachingLanguage: data.teachingLanguage.id
    }
}