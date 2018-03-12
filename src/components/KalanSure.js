import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Platform, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

class KalanSure extends Component {
    constructor() {
        super();
        this.state = {
            localvakitler: [],
            currentTime: new Date()
        };
    }

    componentWillMount = async () => {
        try {
            const localdata = await AsyncStorage.getItem('localdata');
            const parsed = JSON.parse(localdata);

            this.setState({
                localvakitler: parsed.vakitlocal,
            });
        } catch (error) {
            console.log(error);
        }
       this.interval = setInterval(() => {
            this.setState({});
            console.log('setınterval');     
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

     kalanSureHesap = (val, val2) => {
        const currentTime = new Date();
        const yil = currentTime.getFullYear();
        const ay = currentTime.getMonth();
        const gun = currentTime.getDate();
        const Kalan = new Date(yil, ay, gun, Number(val), Number(val2), 0, 0); //diyanetten alınan string vakitler Date objesine donusturuldu
        const KalanSaat = Math.floor(((Kalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
        const KalanDakika = Math.floor(((Kalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);

                  return {
                    KalanSaat, KalanDakika, Kalan
                  };           
    };
   
    render() {                
        if (this.state.localvakitler.length > 0) {              
            const currentTime = new Date();
            const localgelen = this.state.localvakitler[0];//diyanet sitesinden alınan vakitler
            // imsak

            //gunes
            const gunesdiyanetsaatnew = localgelen.Gunes.substring(0, 2);//alınan vakitlerden saat ve dakika alınıyor
            const gunesdiyanetdakikanew = localgelen.Gunes.substring(3, 5);
            //ogle
            const oglediyanetsaatnew = localgelen.Ogle.substring(0, 2);
            const oglediyanetdakikanew = localgelen.Ogle.substring(3, 5); 
            //ikindi
            const ikindidiyanetsaatnew = localgelen.Ikindi.substring(0, 2);
            const ikindidiyanetdakikanew = localgelen.Ikindi.substring(3, 5);
            // aksam
            const aksamdiyanetsaatnew = localgelen.Aksam.substring(0, 2);
            const aksamdiyanetdakikanew = localgelen.Aksam.substring(3, 5);

            const imsakKalanfonc = this.kalanSureHesap(gunesdiyanetsaatnew, gunesdiyanetdakikanew);
            const ogleKalanfonc = this.kalanSureHesap(oglediyanetsaatnew, oglediyanetdakikanew);
            const ikindiKalanfonc = this.kalanSureHesap(ikindidiyanetsaatnew, ikindidiyanetdakikanew);
            const aksamKalanfonc = this.kalanSureHesap(aksamdiyanetsaatnew, aksamdiyanetdakikanew);

            // yatsı
            const yil = currentTime.getFullYear();
            const ay = currentTime.getMonth();
            const gun = currentTime.getDate();
            const diyanetgun = this.state.localvakitler[0].MiladiTarihKisa.substring(0, 2); 
            const localgelenyatsi = Number(diyanetgun) === gun ? this.state.localvakitler[0] : this.state.localvakitler[1];
            const imsakdiyanetsaatnewyatsi = localgelenyatsi.Imsak.substring(0, 2);            
            const imsakdiyanetdakikanewyatsi = localgelenyatsi.Imsak.substring(3, 5);
            const yatsiKalan = Number(diyanetgun) === gun ? new Date(yil, ay, gun, Number(imsakdiyanetsaatnewyatsi), Number(imsakdiyanetdakikanewyatsi), 0, 0)
             : new Date(yil, ay, gun + 1, Number(imsakdiyanetsaatnewyatsi), Number(imsakdiyanetdakikanewyatsi), 0, 0);
            const yatsiKalanSaat = Math.floor(((yatsiKalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
            const yatsiKalanDakika = Math.floor(((yatsiKalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);
            

            if ((imsakKalanfonc.Kalan.getTime() - currentTime.getTime()) >= 0) {
                return (
                    <KalanSureUi 
                    diyanetsaat={imsakKalanfonc.KalanSaat} 
                    diyanetdakika={imsakKalanfonc.KalanDakika} 
                    />
                );
            } else if ((ogleKalanfonc.Kalan.getTime() - currentTime.getTime()) >= 0) {
                return (
                    <KalanSureUi 
                    diyanetsaat={ogleKalanfonc.KalanSaat} 
                    diyanetdakika={ogleKalanfonc.KalanDakika} 
                    />);
            } else if ((ikindiKalanfonc.Kalan.getTime() - currentTime.getTime()) >= 0) {
                return (
                    <KalanSureUi 
                    diyanetsaat={ikindiKalanfonc.KalanSaat}
                     diyanetdakika={ikindiKalanfonc.KalanDakika} 
                    />);
            } else if ((aksamKalanfonc.Kalan.getTime() - currentTime.getTime()) >= 0) {
                return (
                    <KalanSureUi 
                    diyanetsaat={aksamKalanfonc.KalanSaat} 
                    diyanetdakika={aksamKalanfonc.KalanDakika} 
                    />);
            } else if ((yatsiKalan.getTime() - currentTime.getTime()) >= 0) {
                console.log('yatsooo');
                
                return (
                    <KalanSureUi 
                    diyanetsaat={yatsiKalanSaat} 
                    diyanetdakika={yatsiKalanDakika} 
                    />);         
            }           
        } return (
           <View style={styles.kalanSureView} >

           <Text style={styles.vakitYazi}>
               Vaktin Çıkmasına
            </Text>
           <View
               style={{
                   flexDirection: 'row',
                   justifyContent: 'center',
                   alignItems: 'center'
               }}
           >
               <View>
                   <Text style={styles.kalanSureText}> 
                      {}
                   </Text>
               </View>

               <View
                   style={{
                       justifyContent: 'center',
                       alignItems: 'center',
                       marginRight: 5
                   }}
               >
                   <Text style={styles.kalanSureText}>:</Text>
               </View>

               <View>
                   <Text style={styles.kalanSureText}>
                     
                           <Text style={styles.kalanSureText}>{} </Text>
                        
                   </Text>
               </View>
           </View>
         </View>
        );
    }//render sonu
}//component sonu

const KalanSureUi = props => (
  <View style={styles.kalanSureView} >

        <Text style={styles.vakitYazi}>
            Vaktin Çıkmasına
        </Text>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <View>
                <Text style={styles.kalanSureText}> {props.diyanetsaat < 10 ?
                    (<Text style={styles.kalanSureText}>0{props.diyanetsaat} </Text>)
                    : props.diyanetsaat}
                </Text>
            </View>

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5
                }}
            >
                <Text style={styles.kalanSureText}>:</Text>
            </View>

            <View>
                <Text style={styles.kalanSureText}>
                    {props.diyanetdakika < 10 ?
                        (<Text style={styles.kalanSureText}>0{props.diyanetdakika} </Text>)
                        : props.diyanetdakika}
                </Text>
            </View>
        </View>
 </View>
);

const mapStateToProps = ({ dataResponse }) => {
    const { datavakitler } = dataResponse;
    return { datavakitler };
};


const styles = StyleSheet.create({
    kalanSureView: {
        margin: Platform.OS === 'ios' ? '2%' : '3%',
        marginLeft: '20%',
        marginRight: '20%',
        backgroundColor: 'rgba(166, 201, 242, 0.6)',
        borderRadius: 5,
        padding: 3,
        alignItems: 'center',
    },
    kalanSureText: {
        fontSize: 40,
        //padding: 2,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'black',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'notoserif',
        justifyContent: 'center',
        //backgroundColor: 'yellow'
    },
    vakitYazi: {
        fontSize: 20,
        //padding: 2,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'black',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'notoserif',
        justifyContent: 'center',
    }
});

export default connect(mapStateToProps, {})(KalanSure); // eslint-disable-line
    
