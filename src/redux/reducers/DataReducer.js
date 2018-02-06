const INITIAL_STATE = {
    datavakitler: [],
    ilceid: '',
    ilcead: '',
    sehirid: '',
    sehirisim: '',
    ulkeid: '',
    ulkeisim: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'data_changed':
            return { ...state, datavakitler: action.payload.datavakitler };
        case 'ilce_ıd':
            return { ...state, ilceid: action.payload.ilceid };
        case 'ilce_isim':
            return { ...state, ilcead: action.payload.ilcead };      
        case 'sehir_id':
            return { ...state, sehirid: action.payload.sehirid }; 
        case 'sehir_isim':
            return { ...state, sehirisim: action.payload.sehirisim }; 
        case 'ulke_id':
            return { ...state, ulkeid: action.payload.ulkeid }; 
        case 'ulke_isim':
            return { ...state, ulkeisim: action.payload.ulkeisim };        
        default:
            return state; 
            
}
};
