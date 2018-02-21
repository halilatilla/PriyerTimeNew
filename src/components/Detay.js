import React, { Component } from 'react';
import {
      Text, View, StyleSheet, Platform, Button,
      TouchableOpacity, ImageBackground, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ilceIsim, sehirIsim, ulkeIsim, ulkeID, sehirID, ilceID, dataChange }
      from '../redux/actions/index';
import backgroundImage from '../assets/backgroundimage.jpg';
import Spinner from './Spinner';


class Detay extends Component {
      constructor() {
            super();
            this.state = {
                  loading: true,
                  localvakitler: [],
                  localulkeisim: '',
                  localsehirisim: '',
                  localilceisim: '',
            };
            console.log('Constructor');
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
                  console.log(sondatatüm);
                  console.log('ComponentDidMount İf içinde data gönderiliyor');
            }
      }

      componentDidMount = async () => {
            console.log('Son Data içinde');
                  try {
                        const localdata = await AsyncStorage.getItem('localdata');
                        const parsed = JSON.parse(localdata);
                        console.log(parsed);
                        console.log('Son data Try içinde');

                        this.setState({
                              localvakitler: parsed.vakitlocal,
                              localulkeisim: parsed.ulke,
                              localsehirisim: parsed.sehir,
                              localilceisim: parsed.ilce,
                        });

                        //  this.props.dataChange({ datavakitler: parsed.vakitlocal });
                         this.props.ulkeID({ ulkeid: parsed.ulkeidlocal });
                         this.props.sehirID({ sehirid: parsed.sehiridlocal });
                         this.props.ilceID({ ilceid: parsed.ilceidlocal });
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

      /* eslint-disable */ /* eslint-enable */
      render() {
            console.log('Render');

            const mapGelenData = this.state.localvakitler.map((resp, id) => {// eslint-disable-line
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
            if (this.state.localsehirisim === this.state.localulkeisim) {
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
                                                {this.state.localulkeisim} </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                          onPress={this.buttonIlce} style={styles.touchableStyle}
                                    >
                                          <Text style={styles.textToubleIn}>
                                                {this.state.localilceisim} </Text>
                                    </TouchableOpacity>

                              </View>
                              <View style={styles.buttonStyle}>
                                    <Button
                                          style={{ flex: 1 }}
                                          onPress={this.buttonMain} title='KONUM SEÇ'
                                    />
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
                        <View style={styles.buttonStyle}>
                              <Button
                                    style={{ flex: 1 }}
                                    onPress={this.buttonMain} title='KONUM SEÇ'
                              />
                        </View>

                        <View style={styles.containerStyle}>
                              {mapGelenData}
                        </View>
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
                                    {isimKontrol}
                                    <View style={styles.buttonStyle}>
                                          <Button
                                                style={{ flex: 1 }}
                                                onPress={this.buttonMain} title='KONUM SEÇ'
                                          />
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
                                    <Button
                                          style={{ flex: 1 }}
                                          onPress={this.buttonMain} title='KONUM SEÇ'
                                    />
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
            margin: Platform.OS === 'ios' ? '2%' : '3%',
            marginLeft: '30%',
            marginRight: '30%',
            alignItems: 'center',
            backgroundColor: Platform.OS === 'ios' ? 'rgba(166, 201, 242, 0.6)' : null,
            borderRadius: 5,
            // shadowColor: 'blue',
            // shadowOpacity: 0.4,
            // shadowOffset: { width: 0, height: 2 },
            // shadowRadius: 3,
      }
}
);

const mapStateToProps = ({ dataResponse }) => {
      const { datavakitler, ulkeisim, ilcead, sehirisim, ulkeid, sehirid, ilceid } = dataResponse;
      return { datavakitler, ulkeisim, ilcead, sehirisim, ulkeid, sehirid, ilceid };
};

export default connect(mapStateToProps, { ilceIsim, sehirIsim, ulkeIsim, ulkeID, sehirID, ilceID, dataChange })(Detay); // eslint-disable-line
