import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Platform, ScrollView, ImageBackground, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//import { Drawer } from 'native-base';
import { ilceIsim, sehirIsim, ulkeIsim, ulkeID, sehirID, ilceID, dataChange }
    from '../redux/actions/index';
import backgroundImage from '../assets/backgroundimage.jpg';
import Spinner from './Spinner';

class AylikVakitler extends Component {
    constructor() {
        super();
        this.state = {
            mainscreenload: true,
            loading: true,
            localvakitler: [],
            localulkeisim: '',
            localsehirisim: '',
            localilceisim: '',
        };
    }


    componentWillMount = async () => {
        try {
            const localdata = await AsyncStorage.getItem('localdata');
            const parsed = JSON.parse(localdata);

            this.setState({
                localvakitler: parsed.vakitlocal,
                localulkeisim: parsed.ulke,
                localsehirisim: parsed.sehir,
                localilceisim: parsed.ilce,
            });
            //   this.props.ulkeID({ ulkeid: parsed.ulkeidlocal });
            //   this.props.sehirID({ sehirid: parsed.sehiridlocal });
            //   this.props.ilceID({ ilceid: parsed.ilceidlocal });
        } catch (error) {
            console.log(error);
        }
    }
    buttonMain = () => {
        Actions.Ulke({ type: 'reset' });
    }
    buttonUlke = () => {
        Actions.Ulke({ type: 'reset' });
    }
    buttonSehir = () => {
        Actions.Sehir({ type: 'reset' });
    }
    buttonIlce = () => {
        Actions.Ilce({ type: 'reset' });
    }
    render() {
        const spinner = (
            <View >
                <Spinner />
            </View>
        );
        const mapGelenData = this.state.localvakitler.map((resp, id) => {
                /* eslint-disable */ 
             return (<View key={id} style={styles.containerStyle}> 

                <View style={styles.vakitlerViewStyle} >
                    <Text style={styles.tarihText}>{resp.MiladiTarihKisa}</Text>
                </View>

                <View style={styles.vakitlerViewStyle}>
                    <View style={styles.vakitView}>
                        <Text style={styles.vakitYazi}>İmsak</Text>
                    </View>
                    <View style={styles.noktaView}>
                        <Text style={styles.vakitNokta}>:</Text>
                    </View>
                    <View style={styles.tarihView}>
                        <Text style={styles.vakitTarih}>{resp.Imsak}</Text>
                    </View>
                </View>

                <View style={styles.vakitlerViewStyle}>
                    <View style={styles.vakitView}>
                        <Text style={styles.vakitYazi}>Güneş</Text>
                    </View>
                    <View style={styles.noktaView}>
                        <Text style={styles.vakitNokta}>:</Text>
                    </View>
                    <View style={styles.tarihView}>
                        <Text style={styles.vakitTarih}>{resp.Gunes}</Text>
                    </View>
                </View>

                <View style={styles.vakitlerViewStyle}>
                    <View style={styles.vakitView}>
                        <Text style={styles.vakitYazi}>Öğle</Text>
                    </View>
                    <View style={styles.noktaView}>
                        <Text style={styles.vakitNokta}>:</Text>
                    </View>
                    <View style={styles.tarihView}>
                        <Text style={styles.vakitTarih}>{resp.Ogle}</Text>
                    </View>
                </View>

                <View style={styles.vakitlerViewStyle}>
                    <View style={styles.vakitView}>
                        <Text style={styles.vakitYazi}>İkindi</Text>
                    </View>
                    <View style={styles.noktaView}>
                        <Text style={styles.vakitNokta}>:</Text>
                    </View>
                    <View style={styles.tarihView}>
                        <Text style={styles.vakitTarih}>{resp.Ikindi}</Text>
                    </View>
                </View>

                <View style={styles.vakitlerViewStyle}>
                    <View style={styles.vakitView}>
                        <Text style={styles.vakitYazi}>Akşam</Text>
                    </View>
                    <View style={styles.noktaView}>
                        <Text style={styles.vakitNokta}>:</Text>
                    </View>
                    <View style={styles.tarihView}>
                        <Text style={styles.vakitTarih}>{resp.Aksam}</Text>
                    </View>
                </View>

                <View style={styles.vakitlerViewStyle}>
                    <View style={styles.vakitView}>
                        <Text style={styles.vakitYazi}>Yatsı</Text>
                    </View>
                    <View style={styles.noktaView}>
                        <Text style={styles.vakitNokta}>:</Text>
                    </View>
                    <View style={styles.tarihView}>
                        <Text style={styles.vakitTarih}>{resp.Yatsi}</Text>
                    </View>
                </View>
                {this.state.loading = false}
            </View>);/* eslint-enable */
        });

        if (this.state.localsehirisim === this.state.localulkeisim) {
            console.log('sehir=ulke');

            //ülke ismi ile şehir ismi aynı ise şehir ismini gösterme
            if (this.state.loading) {
                // mapGelen datası dolmadı ise Spinner göster
                return (<ImageBackground
                    source={backgroundImage}
                    style={{
                        flex: 1,
                        marginTop: Platform.OS === 'ios' ? 21 : null
                    }}
                >

                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        {spinner}
                    </View>

                </ImageBackground>
                );
            } return (<ImageBackground
                source={backgroundImage}
                style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? 21 : null
                }}
            >
                {/* <Drawer
            hideNavBar
            key="drawer"
            contentComponent={DrawerContent}
            drawerImage={MenuIcon}
            drawerWidth={300}
            /> */}
                <ScrollView>

                    {mapGelenData}
                </ScrollView>
            </ImageBackground>
            );
        } else if (this.state.localsehirisim !== this.state.localulkeisim) {
            console.log('sehir!!!=ulke');

            if (this.state.loading) {
                return (
                    <ImageBackground
                        source={backgroundImage}
                        style={{
                            flex: 1,
                            marginTop: Platform.OS === 'ios' ? 21 : null
                        }}
                    >
                        {spinner}
                    </ImageBackground>
                );
            } return (
                <ImageBackground
                    source={backgroundImage}
                    style={{
                        flex: 1,
                        marginTop: Platform.OS === 'ios' ? 21 : null
                    }}
                >
                    {/* <Drawer
                hideNavBar
                key="drawer"
                contentComponent={DrawerContent}
                drawerImage={MenuIcon}
                drawerWidth={300}
                /> */}
                    <ScrollView>

                        {mapGelenData}
                    </ScrollView>
                </ImageBackground>
            );
        }
    }//render sonu

}//component sonu

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: 10,
        marginLeft: '10%',
        marginRight: '10%',
        //marginTop: Platform.OS === 'ios' ? 5 : 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom: '4%',
    },
    vakitlerViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(166, 201, 242, 0.6)',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '1%',
        marginBottom: '1%',
        borderRadius: 5,

    },
    vakitView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    noktaView: {
        justifyContent: 'center',
    },
    tarihView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    },
    vakitYazi: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'notoserif',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
    },
    vakitTarih: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'notoserif',
        fontWeight: 'bold',
        color: 'black',
        fontSize: Platform.OS === 'ios' ? 25 : 25,
        alignItems: 'center',
        justifyContent: 'center',

    },
    vakitNokta: {
        fontFamily: Platform.OS === 'ios' ? 'Bodoni 72' : 'monospace',
        fontWeight: 'bold',
        color: 'black',
        fontSize: Platform.OS === 'ios' ? 25 : 25,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tarihText: {
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'black',
        padding: 5,
    }
}
);

const mapStateToProps = ({ dataResponse }) => {
    const { datavakitler, ulkeisim, ilcead, sehirisim, ulkeid, sehirid, ilceid } = dataResponse;
    return { datavakitler, ulkeisim, ilcead, sehirisim, ulkeid, sehirid, ilceid };
};


export default connect(mapStateToProps, { ilceIsim, sehirIsim, ulkeIsim, ulkeID, sehirID, ilceID, dataChange })(AylikVakitler); // eslint-disable-line
