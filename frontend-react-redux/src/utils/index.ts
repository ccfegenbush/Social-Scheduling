export const toCurrency = (num: number): any => {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// export const formatTime = (date: string): any => {
//     const d = new Date(date);
//     return(`${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`);
// }
export const formatTime = (data: string): string => {
    return data.replace(/(.+)T(.+)/, '$1');
}

export const stringTruncate = (str: string): any => {
    if(str.length > 10){
     return `${str.substring(0, 10)}...`;
    }
    return str;
}

export const toUpperCaseFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

export const logoutCleanUp = () => {
    localStorage.clear();
}

export const getReimbType = (index: number) => {
    switch(index){
        case 0:
            return 'Lodging';
        case 1:
            return 'Travel';
        case 2: 
            return 'Food';
        default:
            return 'Other'
    }
}

export const filterReimb = (r: any, num: number): boolean => {
    const result = r.filter( (i :any) => i.reimbStatusId === num);
    return result.length ? true : false;
} 