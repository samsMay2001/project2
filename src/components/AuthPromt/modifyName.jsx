export function modifyName(name){
    // Regular expression to match special characters
    const regex = /[^\w\s]/g;
    // Replace special characters with underscore
    const replacedStr = name.replace(regex, '_');

    return replacedStr.trim();
}