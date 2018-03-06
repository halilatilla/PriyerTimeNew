import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Platform, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from './Spinner';

class KalanSure extends Component {
    constructor() {
        super();
        this.state = {
            localvakitler: [],
            load: false
        };
    }

    componentWillMount = async () => {
        try {
            const localdata = await AsyncStorage.getItem('localdata');
            const parsed = JSON.parse(localdata);

            this.setState({
                localvakitler: parsed.vakitlocal,
                load: true
            });
        } catch (error) {
            console.log(error);
        }
    }
    VAKIT = [{ imsak: 'Imsak', ogle: 'Ogle', ikindi: 'Ikindi', aksam: 'Aksam', yatsi: 'Yatsi' }];


    render() {
        if (this.state.load) {
            const currentTime = new Date();
            const yil = currentTime.getFullYear();
            const ay = currentTime.getMonth();
            const gun = currentTime.getDate();

           // imsak
            const imsakdiyanetsaat = this.state.localvakitler.map((resp) => {
                return resp.Imsak.charAt(0).slice(0, 1)
                    + resp.Imsak.charAt(1).slice(0, 1);
            });
            const imsakdiyanetdakika = this.state.localvakitler.map((resp) => {
                return resp.Imsak.charAt(3).slice(0, 1)
                    + resp.Imsak.charAt(4).slice(0, 1);
            });
            const imsakKalan = new Date(yil, ay, gun, Number(...imsakdiyanetsaat), Number(...imsakdiyanetdakika), 0, 0);
            const imsakKalanSaat = Math.floor(((imsakKalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
            const imsakKalanDakika = Math.floor(((imsakKalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);

            //ogle
            const oglediyanetsaat = this.state.localvakitler.map((resp) => {
                return resp.Ogle.charAt(0).slice(0, 1)
                    + resp.Ogle.charAt(1).slice(0, 1);
            });
            const oglediyanetdakika = this.state.localvakitler.map((resp) => {
                return resp.Ogle.charAt(3).slice(0, 1)
                    + resp.Ogle.charAt(4).slice(0, 1);
            });
            const ogleKalan = new Date(yil, ay, gun, Number(...oglediyanetsaat), Number(...oglediyanetdakika), 0, 0);
            const ogleKalanSaat = Math.floor(((ogleKalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
            const ogleKalanDakika = Math.floor(((ogleKalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);

            // ikindi
            const ikindidiyanetsaat = this.state.localvakitler.map((resp) => {
                return resp.Ikindi.charAt(0).slice(0, 1)
                    + resp.Ikindi.charAt(1).slice(0, 1);
            });
            const ikindidiyanetdakika = this.state.localvakitler.map((resp) => {
                return resp.Ikindi.charAt(3).slice(0, 1)
                    + resp.Ikindi.charAt(4).slice(0, 1);
            });
            const ikindiKalan = new Date(yil, ay, gun, Number(...ikindidiyanetsaat), Number(...ikindidiyanetdakika), 0, 0);
            const ikindiKalanSaat = Math.floor(((ikindiKalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
            const ikindiKalanDakika = Math.floor(((ikindiKalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);

            // aksam
            const aksamdiyanetsaat = this.state.localvakitler.map((resp) => {
                return resp.Aksam.charAt(0).slice(0, 1)
                    + resp.Aksam.charAt(1).slice(0, 1);
            });
            const aksamdiyanetdakika = this.state.localvakitler.map((resp) => {
                return resp.Aksam.charAt(3).slice(0, 1)
                    + resp.Aksam.charAt(4).slice(0, 1);
            });
            const aksamKalan = new Date(yil, ay, gun, Number(...aksamdiyanetsaat), Number(...aksamdiyanetdakika), 0, 0);
            const aksamKalanSaat = Math.floor(((aksamKalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
            const aksamKalanDakika = Math.floor(((aksamKalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);

            //yatsı
            const yatsidiyanetsaat = this.state.localvakitler.map((resp) => {
                return resp.Yatsi.charAt(0).slice(0, 1)
                    + resp.Yatsi.charAt(1).slice(0, 1);
            });
            const yatsidiyanetdakika = this.state.localvakitler.map((resp) => {
                return resp.Yatsi.charAt(3).slice(0, 1)
                    + resp.Yatsi.charAt(4).slice(0, 1);
            });
            const yatsiKalan = new Date(yil, ay, gun, Number(...yatsidiyanetsaat), Number(...yatsidiyanetdakika), 0, 0);
            const yatsiKalanSaat = Math.floor(((yatsiKalan.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24);
            const yatsiKalanDakika = Math.floor(((yatsiKalan.getTime() - currentTime.getTime()) / (1000 * 60)) % 60);

            if ((imsakKalan.getTime() - currentTime.getTime()) >= 0) {
                return (
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
                                <Text style={styles.kalanSureText}> {imsakKalanSaat < 10 ?
                                    (<Text style={styles.kalanSureText}>0{imsakKalanSaat} </Text>)
                                    : imsakKalanSaat}
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
                                    {imsakKalanDakika < 10 ?
                                        (<Text style={styles.kalanSureText}>0{imsakKalanDakika} </Text>)
                                        : imsakKalanDakika}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            } else if ((ogleKalan.getTime() - currentTime.getTime()) >= 0) {
                return (
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
                                <Text style={styles.kalanSureText}> {ogleKalanSaat < 10 ?
                                    (<Text style={styles.kalanSureText}>0{ogleKalanSaat} </Text>)
                                    : ogleKalanSaat}
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
                                    {ogleKalanDakika < 10 ?
                                        (<Text style={styles.kalanSureText}>0{ogleKalanDakika} </Text>)
                                        : ogleKalanDakika}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            } else if ((ikindiKalan.getTime() - currentTime.getTime()) >= 0) {
                return (
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
                                <Text style={styles.kalanSureText}> {ikindiKalanSaat < 10 ?
                                    (<Text style={styles.kalanSureText}>0{ikindiKalanSaat} </Text>)
                                    : ikindiKalanSaat}
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
                                    {ikindiKalanDakika < 10 ?
                                        (<Text style={styles.kalanSureText}>0{ikindiKalanDakika} </Text>)
                                        : ikindiKalanDakika}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            } else if ((aksamKalan.getTime() - currentTime.getTime()) >= 0) {
                return (
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
                                <Text style={styles.kalanSureText}> {aksamKalanSaat < 10 ?
                                    (<Text style={styles.kalanSureText}>0{aksamKalanSaat} </Text>)
                                    : aksamKalanSaat}
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
                                    {aksamKalanDakika < 10 ?
                                        (<Text style={styles.kalanSureText}>0{aksamKalanDakika} </Text>)
                                        : aksamKalanDakika}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
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
                            <Text style={styles.kalanSureText}> {yatsiKalanSaat < 10 ?
                                (<Text style={styles.kalanSureText}>0{yatsiKalanSaat} </Text>)
                                : yatsiKalanSaat}
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
                                {yatsiKalanDakika < 10 ?
                                    (<Text style={styles.kalanSureText}>0{yatsiKalanDakika} </Text>)
                                    : yatsiKalanDakika}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        } return (
            <Spinner style={{ justifyContent: 'center', alignItems: 'center' }} />
        );
    }//render sonu
}
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
