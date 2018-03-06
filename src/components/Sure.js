const Sure = async (diyanetsaat, diyanetdakika) => {
    const currentTime = await new Date();
    const yil = await currentTime.getFullYear();
    const ay = await currentTime.getMonth();
    const gun = await currentTime.getDate();

    const saat = await Number(...diyanetsaat);
    const dakia = await Number(...diyanetdakika);
    
    const Kalan = await new Date(yil, ay, gun, saat, dakia, 0, 0);
        
     const kalans = await Kalan.getTime();
     const kalanc = await currentTime.getTime();
     
    
    const msKalan = await (kalans - kalanc);
    
    const KalanSaat = await Math.floor((msKalan / (1000 * 60 * 60)) % 24);
    const KalanDakika = await Math.floor((msKalan / (1000 * 60)) % 60);

    
    return (KalanSaat, KalanDakika);
};


export default Sure;
