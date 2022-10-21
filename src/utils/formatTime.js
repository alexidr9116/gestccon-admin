import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export const WEEK_ARRAY = [
  {
    index:0,
    name:'Sun'
  },
  {
    index:1,
    name:'Mon'
  },
  {
    index:2,
    name:'Tue'
  },
  {
    index:3,
    name:'Wed'
  },
  {
    index:4,
    name:'Tur'
  },
  {
    index:5,
    name:'Fri'
  },
  {
    index:6,
    name:'Sat'
  },
]
