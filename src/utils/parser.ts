import { format, formatDistanceToNow } from 'date-fns';

export const parseTimestampToMonthYear = (timestamp: number | string | null) => {
    if(!timestamp) return '';
    const date = new Date(Number(timestamp));
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
}

export const parseTimestampToReadable = (timestamp: number | string | null) => {
    if(!timestamp) return '';
    const postDate: Date = new Date(timestamp);
    const now: Date = new Date();
    const diffInHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);


    if(diffInHours < 24) {
        return formatDistanceToNow(postDate, { addSuffix: true });
    } else {
        return format(postDate, 'yyyy-MM-dd');
    }
}