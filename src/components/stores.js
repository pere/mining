import { writable,readable,derived } from 'svelte/store';
export const storeData = writable({
story:'initial',
mapPloted: 
{
    country: null,
    type: "commodity",
    style:null,
    fillColor:null,
    mapStyle:null
}

})