export const dataChange = (datavakitler) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'data_changed',
                payload: datavakitler
            });
    };
};

export const ilceID = (ilceid) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'ilce_ıd',
                payload: ilceid
            });
    };
};

export const ilceIsim = (ilcead) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'ilce_isim',
                payload: ilcead
            });
    };
};

export const sehirID = (sehirid) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'sehir_id',
                payload: sehirid
            });
    };
};

export const sehirIsim = (sehirisim) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'sehir_isim',
                payload: sehirisim
            });
    };
};

export const ulkeID = (ulkeid) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'ulke_id',
                payload: ulkeid
            });
    };
};

export const ulkeIsim = (ulkeisim) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'ulke_isim',
                payload: ulkeisim
            });
    };
};
