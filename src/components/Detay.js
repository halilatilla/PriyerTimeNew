import React, { Component } from 'react';
import {
      Text, View, StyleSheet, Platform, Button,
      TouchableOpacity, ImageBackground, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
//import Storage from 'react-native-storage';
import { Actions } from 'react-native-router-flux';
import { dataChange } from '../redux/actions/index';
import backgroundImage from '../assets/backgroundimage.jpg';
import Spinner from './Spinner';


class Detay extends Component {
      constructor() {
            super();
            this.state = {
                  loading: true,
                  sonulkeisim: '',
                  sonsehirisim: '',
                  sonilceisim: '',
                  sonilceid: '',
                  localdatavakitler: []
            };
            console.log('Detay constructor');
            console.log(this.state.localdatavakitler);    
            //console.log(this.propsd.datavakitler);         
      }


      componentWillMount = async () => { //vakitler data
            await this.sonData();
            if (this.props.sonilceid === '' || this.props.sonilceid === '9540') {
                  axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.props.ilceid}`)
                  .then(response => this.props.dataChange({ datavakitler: response.data }))
                  .catch(error => {
                        console.log(error);
                        throw error;
                  });
                  console.log('Detay İf içinde');
            } else {
                  axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.state.sonilceid}`)
                  .then(response => this.props.dataChange({ datavakitler: response.data }))
                  .catch(error => {
                        console.log(error);
                        throw error;
                  });      
                  console.log('Detay ComponentWillMount Else');
                  console.log(this.state.sonilceid);       
            }
            
            console.log('Detay componentWillMount');
      };

        componentDidMount = () => {
              console.log(' Detay componentDidMount');
              
              if (this.props.ulkeisim !== 'TÜRKİYE' || this.props.sehirisim !== 'İSTANBUL' 
              || this.props.ilcead !== 'ESENYURT' || this.props.ilceid !== '9540') {
                  const sondatatüm = {
                        ulke: this.props.ulkeisim,
                        sehir: this.props.sehirisim,
                        ilce: this.props.ilcead,
                        ilceidgonder: this.props.ilceid,
                         datalocal: this.props.datavakitler
                  };
      
                  AsyncStorage.setItem('sonulkeisim', JSON.stringify(sondatatüm));
                  console.log(' Local Data Kayıt Yeri');
                  console.log(sondatatüm); 
              }
              console.log(this.props.datavakitler);        
     };
      sonData = async () => {
                  try {
                        const ulke = await AsyncStorage.getItem('sonulkeisim');
                        const parsed = JSON.parse(ulke);
                        console.log(parsed);
                        console.log(parsed.datalocal);
                        console.log('data alınıyor');
                        this.setState({ sonulkeisim: parsed.ulke });
                        this.setState({ sonsehirisim: parsed.sehir });
                        this.setState({ sonilceisim: parsed.ilce });
                        this.setState({ sonilceid: parsed.ilceidgonder });
                        this.setState({ localdatavakitler: parsed.datalocal });
                  } catch (error) {
                        console.log(error);
                  }
                  console.log('SonData içinde');                 
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

      /* eslint-disable */ /* eslint-enable */
      render() {
            const mapGelenData = this.props.datavakitler.map((resp, id) => {// eslint-disable-line
                  if (id === 0) {
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

                        </View>);
                  }
                  this.state.loading = false;
            });

            const isimKontrol = (
                  <View style={styles.touchableviewStyle} >
                        <TouchableOpacity onPress={this.buttonUlke} style={styles.touchableStyle} >
                              <Text style={styles.textToubleIn}> {this.props.ulkeisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.buttonSehir} style={styles.touchableStyle}>
                              <Text style={styles.textToubleIn}> {this.props.sehirisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.buttonIlce} style={styles.touchableStyle}>
                              <Text style={styles.textToubleIn}> {this.props.ilcead} </Text>
                        </TouchableOpacity>

                  </View>
            );
            if (this.props.sehirisim === this.props.ulkeisim) {
                  //ülke ismi ile şehir ismi aynı ise şehir ismini gösterme
                  if (this.state.loading) {
                        // mapGelen datası dolmadı ise Spinner göster
                        return (<ImageBackground
                              source={backgroundImage}
                              style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }}
                        >
                              <View style={styles.touchableviewStyle} >
                                    <TouchableOpacity
                                          onPress={this.buttonUlke}
                                          style={styles.touchableStyle}
                                    >
                                          <Text style={styles.textToubleIn}>
                                                {this.props.ulkeisim} </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                          onPress={this.buttonIlce} style={styles.touchableStyle}
                                    >
                                          <Text style={styles.textToubleIn}>
                                                {this.props.ilcead} </Text>
                                    </TouchableOpacity>

                              </View>
                              <View style={styles.buttonStyle}>
                                    <Button onPress={this.buttonMain} title='Değiştir' />
                              </View>

                              <View style={styles.containerStyle}>
                                    <Spinner />
                              </View>
                        </ImageBackground>
                        );
                  } return (<ImageBackground
                        source={backgroundImage}
                        style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }}
                  >
                        <View style={styles.touchableviewStyle} >
                              <TouchableOpacity
                                    onPress={this.buttonUlke} style={styles.touchableStyle}
                              >
                                    <Text style={styles.textToubleIn}> {this.props.ulkeisim} </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                    onPress={this.buttonIlce} style={styles.touchableStyle}
                              >
                                    <Text style={styles.textToubleIn}> {this.props.ilcead} </Text>
                              </TouchableOpacity>

                        </View>
                        <View style={styles.buttonStyle}>
                              <Button onPress={this.buttonMain} title='Değiştir' />
                        </View>

                        <View style={styles.containerStyle}>
                              {mapGelenData}
                        </View>
                  </ImageBackground>
                  );
            } else if (this.props.sehirisim !== this.props.ulkeisim) {
                  if (this.state.loading) {
                        return (
                              <ImageBackground
                                    source={backgroundImage}
                                    style={{
                                          flex: 1,
                                          marginTop: Platform.OS === 'ios' ? 21 : null
                                    }}
                              >
                                    {isimKontrol}
                                    <View style={styles.buttonStyle}>
                                          <Button onPress={this.buttonMain} title='Değiştir' />
                                    </View>

                                    <View style={styles.containerStyle}>
                                          <Spinner />
                                    </View>
                              </ImageBackground>
                        );
                  } return (
                        <ImageBackground
                              source={backgroundImage}
                              style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }}
                        >
                              {isimKontrol}
                              <View style={styles.buttonStyle}>
                                    <Button onPress={this.buttonMain} title='Değiştir' />
                              </View>

                              {mapGelenData}

                        </ImageBackground>
                  );
            }
      }
}

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
            // shadowColor: 'blue',
            // shadowOpacity: 0.4,
            // shadowOffset: { width: 0, height: 2 },
            // shadowRadius: 3,

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
            shadowColor: 'blue',
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,

      },
      buttonStyle: {
            margin: Platform.OS === 'ios' ? '2%' : '3%',
            marginLeft: '15%',
            marginRight: '15%',
            alignItems: 'center',
            backgroundColor: Platform.OS === 'ios' ? 'rgba(166, 201, 242, 0.6)' : null,
            borderRadius: 5,
            shadowColor: 'blue',
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,

      }
}
);

const mapStateToProps = ({ dataResponse }) => {
      const { datavakitler, ilceid, ulkeisim, ilcead, sehirisim } = dataResponse;
      return { datavakitler, ilceid, ulkeisim, ilcead, sehirisim };
};

export default connect(mapStateToProps, { dataChange })(Detay);


      // componentDidMount = () => {
      //       const sondatatüm = {
      //             ulke: this.props.ulkeisim,
      //             sehir: this.props.sehirisim,
      //             ilce: this.props.ilcead,
      //             ilceidgonder: this.props.ilceid
      //       };

      //       AsyncStorage.setItem('sonulkeisim', JSON.stringify(sondatatüm));
      //       console.log(sondatatüm);
      //       console.log('data gönderiliyor');

      //       this.sonData();
      // };
      // sonData = async () => {
      //       try {
      //             const ulke = await AsyncStorage.getItem('sonulkeisim');
      //             const parsed = JSON.parse(ulke);
      //             console.log(parsed);
      //             console.log('data alınıyor');
      //             this.state.sonulkeisim = parsed.ulke;
      //             this.state.sonsehirisim = parsed.sehir;
      //             this.state.sonilceisim = parsed.ilce;
      //             this.state.sonilceid = parsed.ilceidgonder;
      //       } catch (error) {
      //             console.log(error);
      //       }
      // }

