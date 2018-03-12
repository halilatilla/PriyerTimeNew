import React, { Component } from 'react';
import {
      Text, View, StyleSheet, Platform, Button,
      TouchableOpacity, ImageBackground, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//import axios from 'axios';
import Drawer from 'react-native-drawer';
import { ilceIsim, sehirIsim, ulkeIsim, ulkeID, sehirID, ilceID, dataChange }
      from '../redux/actions/index';
import backgroundImage from '../assets/backgroundimage.jpg';
import Spinner from './Spinner';
import KalanSure from './KalanSure';
import DrawerContent from './DrawerContent';


class Detay extends Component {
      constructor() {
            super();
            this.state = {
                  spinnervisible: true,
                  mainscreenload: true,
                  loading: true,
                  localvakitler: [],
                  localulkeisim: '',
                  localsehirisim: '',
                  localilceisim: '',
                  localilceid: ''
            };
      }

      componentWillMount() {
            if ((this.props.ilcead !== '')) {
                  const sondatatüm = {
                        ulke: this.props.ulkeisim,
                        sehir: this.props.sehirisim,
                        ilce: this.props.ilcead,
                        vakitlocal: this.props.datavakitler,
                        ulkeidlocal: this.props.ulkeid,
                        sehiridlocal: this.props.sehirid,
                        ilceidlocal: this.props.ilceid
                  };

                  AsyncStorage.setItem('localdata', JSON.stringify(sondatatüm));
                  this.state.mainscreenload = false;
            }
            //      this.inrervl = setInterval(() => {
            //             console.log('inderval detay');
            //             this.setState({
            //             });
            //       }, 60000 * 60);
      }

      componentDidMount = async () => {
            try {
                  const localdata = await AsyncStorage.getItem('localdata');
                  const parsed = JSON.parse(localdata);

                  this.setState({
                        localvakitler: parsed.vakitlocal,
                        localulkeisim: parsed.ulke,
                        localsehirisim: parsed.sehir,
                        localilceisim: parsed.ilce,
                        localilceid: parsed.ilceidlocal
                  });
                  this.props.ulkeID({ ulkeid: parsed.ulkeidlocal });
                  this.props.sehirID({ sehirid: parsed.sehiridlocal });
                  this.props.ilceID({ ilceid: parsed.ilceidlocal });
            } catch (error) {
                  console.log(error);
            }
      }

      // componentWillUnmount() {
      //       clearInterval(this.inrervl);
      //   }
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

      /* eslint-disable */ /* eslint-enable */
      render() {
            // if (this.state.localvakitler.length > 0) {
            //       const diyanetgun = this.state.localvakitler.map((ret, id) => {// eslint-disable-line
            //             if (id === 0) {
            //                   return (ret.MiladiTarihKisa.charAt(1).slice(0, 1));
            //             }
            //       });
            //       const date = new Date();
            //       if (Number(...diyanetgun) !== date.getDate()) {
            //             console.log('dsfdsfsdf');
                        
            //        axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.state.localilceid}`)
            //             .then(resp => this.setState({ localvakitler: resp.data })
            //             )
            //             .catch(error => {
            //                   console.log(error);
            //                   throw error;
            //             });                       
            //       }
            // }

            
           // console.log(Number(...diyanetgun));
            
            //Number(...diyanetgun) !== date.getDate()
            
            const spinner = (
                  <View >
                        <Spinner />
                  </View>
            );
            const konumButton = (
                  <View style={styles.buttonStyle}>
                        <Button
                              style={{ flex: 1 }}
                              onPress={this.buttonMain} title='KONUM SEÇ'

                        />
                  </View>
            );
            const mapGelenDatanew = (<View style={styles.containerStyle}>
                                    <View style={styles.vakitlerViewStyle} >
                                          <Text style={styles.tarihText}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].MiladiTarihKisa}</Text>
                                    </View>
      
                                    <View style={styles.vakitlerViewStyle}>
                                          <View style={styles.vakitView}>
                                                <Text style={styles.vakitYazi}>İmsak</Text>
                                          </View>
                                          <View style={styles.noktaView}>
                                                <Text style={styles.vakitNokta}>:</Text>
                                          </View>
                                          <View style={styles.tarihView}>
                                                <Text style={styles.vakitTarih}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].Imsak}</Text>
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
                                                <Text style={styles.vakitTarih}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].Gunes}</Text>
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
                                                <Text style={styles.vakitTarih}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].Ogle}</Text>
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
                                                <Text style={styles.vakitTarih}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].Ikindi}</Text>
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
                                                <Text style={styles.vakitTarih}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].Aksam}</Text>
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
                                                <Text style={styles.vakitTarih}>{this.state.localvakitler.length > 0 && this.state.localvakitler[0].Yatsi}</Text>
                                          </View>
                                    </View>
      
                              </View>);
                        this.state.loading = false;                             

            const isimKontrol = (
                  <View style={styles.touchableviewStyle} >
                        <TouchableOpacity onPress={this.buttonUlke} style={styles.touchableStyle} >
                              <Text style={styles.textToubleIn}> {this.state.localulkeisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.buttonSehir} style={styles.touchableStyle}>
                              <Text style={styles.textToubleIn}> {this.state.localsehirisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.buttonIlce} style={styles.touchableStyle}>
                              <Text style={styles.textToubleIn}> {this.state.localilceisim} </Text>
                        </TouchableOpacity>

                  </View>
            );
            const isimKontrolUlkeAndilce = (
                  <View style={styles.touchableviewStyle} >
                        <TouchableOpacity
                              onPress={this.buttonUlke}
                              style={styles.touchableStyle}
                        >
                              <Text style={styles.textToubleIn}>
                                    {this.state.localulkeisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                              onPress={this.buttonIlce} style={styles.touchableStyle}
                        >
                              <Text style={styles.textToubleIn}>
                                    {this.state.localilceisim} </Text>
                        </TouchableOpacity>
                  </View>
            );
 
            if (this.state.localsehirisim === this.state.localulkeisim) {
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
                                    {this.state.mainscreenload === true ? konumButton : spinner}

                              </View>

                        </ImageBackground>
                        );
                  } return (<ImageBackground
                        source={backgroundImage}
                        style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }}
                  >
                        <Drawer
                              type="overlay"
                              content={< DrawerContent />}
                              tapToClose={false}
                              openDrawerOffset={0.2} // 20% gap on the right side of drawer
                              panCloseMask={0.2}
                              closedDrawerOffset={-3}
                              styles={drawerStyles}
                              tweenHandler={(ratio) => ({
                                    main: { opacity: (2 - ratio) / 2 }
                              })}
                        >
                              {isimKontrolUlkeAndilce}
                              <KalanSure />
                              {mapGelenDatanew}
                        </Drawer>
                  </ImageBackground>
                  );
            } else if (this.state.localsehirisim !== this.state.localulkeisim) {
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
                              <Drawer
                                    type="overlay"
                                    content={< DrawerContent />}
                                    tapToClose
                                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                                    panCloseMask={0.2}
                                    closedDrawerOffset={-3}
                                    styles={drawerStyles}
                                    tweenHandler={(ratio) => ({
                                          main: { opacity: (2 - ratio) / 2 }
                                    })}
                              >
                                    {isimKontrol}
                                    <KalanSure />
                                    {mapGelenDatanew}

                              </Drawer>

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
            marginTop: Platform.OS === 'ios' ? 20 : 10,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginBottom: Platform.OS === 'ios' ? '10%' : '10%',
      },
      vakitlerViewStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'rgba(166, 201, 242, 0.6)',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '2%',
            marginBottom: '2%',
            borderRadius: 5,

      },
      vakitView: {
            //backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1


      },
      noktaView: {
            //backgroundColor: 'green'
            justifyContent: 'center',


      },
      tarihView: {
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1

      },
      vakitYazi: {
            fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'notoserif',
            fontWeight: 'bold',
            color: 'black',
            fontSize: Platform.OS === 'ios' ? 25 : 25,
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
            padding: 10,
      },
      textToubleIn: {
            fontSize: 20,
            padding: 2,
            fontWeight: 'bold',
            alignItems: 'center',
            color: 'black',
            fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'notoserif',

      },
      touchableviewStyle: {
            alignItems: 'center',
            padding: Platform.OS === 'ios' ? 5 : 1,
            marginTop: Platform.OS === 'ios' ? '5%' : '5%',
            marginLeft: '10%',
            marginRight: '10%',
            marginBottom: '2%',
      },
      touchableStyle: {
            backgroundColor: 'rgba(166, 201, 242, 0.6)',
            borderRadius: 5,
            margin: 3,
            padding: 3,
            // shadowColor: 'blue',
            // shadowOpacity: 0.4,
            // shadowOffset: { width: 0, height: 2 },
            // shadowRadius: 3,

      },
      buttonStyle: {
            //margin: Platform.OS === 'ios' ? '2%' : '3%',
            // marginLeft: '30%',
            // marginRight: '30%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Platform.OS === 'ios' ? 'rgba(166, 201, 242, 0.6)' : null,
            borderRadius: 5,
            //flex: 1
            // shadowColor: 'blue',
            // shadowOpacity: 0.4,
            // shadowOffset: { width: 0, height: 2 },
            // shadowRadius: 3,
      }
}
);

const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 },
};

const mapStateToProps = ({ dataResponse }) => {
      const { datavakitler, ulkeisim, ilcead, sehirisim, ulkeid, sehirid, ilceid } = dataResponse;
      return { datavakitler, ulkeisim, ilcead, sehirisim, ulkeid, sehirid, ilceid };
};

export default connect(mapStateToProps, { ilceIsim, sehirIsim, ulkeIsim, ulkeID, sehirID, ilceID, dataChange })(Detay); // eslint-disable-line
