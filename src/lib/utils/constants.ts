export const DEFAULT_SEARCH_RADIUS = 10; // 10Km
export const GOOGLE_API_KEY = 'AIzaSyC43CWO8vyaWVaiCVtMnkpINJgsH0_9rTc';
export const DEFAULT_LAT_LNG = {
    lat: 6.54,
    lng: 3.39
}

export const DEFAULT_QUERY = 'hospitals';

export const genRegex = (query: string) => {
    return new RegExp(query, 'gi')
}

export const radiusToZoom = (radius: number) => {
    if (radius > 39) {
        return 9;
    } else if (radius > 24) {
        return 10;
    } else if (radius > 15) {
        return 11;
    } else if (radius > 9) {
        return 12;
    } else {
        return 13;
    }
}

export const marks = {
    1: '1 KM',
    10: '10 KM',
    20: '20 KM',
    30: '30 KM',
    40: '40 KM'
}

export const PartialUserMapIcon = {
    content: '',
    title: 'You',
    color: 'red',
    text: 'you'
}

export const DEFAULT_OPTIONS = [
    {
        value: "hospital"
    },
    {
        value: "pharmacy"
    },
    {
        value: "clinic"
    },
    {
        value: "medical office"
    }
];

export const backendUrl = "https://david-enye-cc.ml"