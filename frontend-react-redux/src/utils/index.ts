export const toUpperCaseFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

export const logoutCleanUp = () => {
    localStorage.clear();
}