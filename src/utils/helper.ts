export const sleep = (ms: number = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const isEmpty = (value: any): boolean => {
    // Check for string values is defined
    if(typeof value === 'string') {
        if(value.trim().length > 0) {
            return false;
        }
    }

    // Check for numbers is defined
    if(typeof value === 'number') {
        if(isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }

    // Check for boolean is defined
    if(typeof value === 'boolean') {
        return false;
    }

    // Check if array is defined
    if(typeof value === 'object' && value instanceof Array) {
        if(value.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    // Check if date is defined
    if(value instanceof Date) {
        if(value.toString() === 'Invalid Date') {
            return true;
        } else {
            return false;
        }
    }

    // Check if object is defined
    if(typeof value === 'object' && value !== null && value !== undefined) {
        if(Object.keys(value).length > 0) {
            return false;
        } else {
            return true;
        }
    }

    return true; // It must be empty then
}

export const removeDuplicates = <T>(items: T[]): T[] => {
    const seen = new Set<string>();
    return items.filter(item => {
        const serializedItem = JSON.stringify(item);
        const duplicate = seen.has(serializedItem);
        seen.add(serializedItem);
        return !duplicate;
    });
};