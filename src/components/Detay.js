import React, { Component } from 'react';
import {
      Text, View, StyleSheet, Platform, Button,
      TouchableOpacity, ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { dataChange } from '../redux/actions/index';
import backgroundImage from '../assets/backgroundimage.jpg';

class Detay extends Component {
      componentWillMount = () => { //vakitler data
            axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.props.ilceid}`)
                  .then(response => this.props.dataChange({ datavakitler: response.data }))
                  .catch(error => {
                        console.log(error);
                        throw error;
                  });
      }

      buttonMain = () => {
            Actions.Ulke();
      }
      buttonUlke = () => {
            Actions.Ulke();
      }
      buttonSehir = () => {
            Actions.Sehir();
      }
      buttonIlce = () => {
            Actions.Ilce();
      }

      render() { /* eslint-disable */
            const mapGelenData = this.props.datavakitler.map((resp, id) => {
                  if (id === 0) {
                        return (<View key={id} style={styles.subcontainerStyle}>
                              <Text style={styles.textStyle}>İmsak    -     {resp.Imsak}</Text>
                              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
                              <Text style={styles.textStyle}>Güneş    -    {resp.Gunes}</Text>
                              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
                              <Text style={styles.textStyle}>Öğle       -    {resp.Ogle}</Text>
                              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
                              <Text style={styles.textStyle}>İkindi     -     {resp.Ikindi}</Text>
                              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
                              <Text style={styles.textStyle}>Akşam   -    {resp.Aksam}</Text>
                              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
                              <Text style={styles.textStyle}>Yatsı      -     {resp.Yatsi}</Text>
                        </View>);
                  }
            }); /* eslint-enaable */

            const isimKontrol = (
                  <View style={styles.viewStyle} >
                        <TouchableOpacity onPress={this.buttonUlke} style={styles.touchableStyle} >
                              <Text style={styles.textSecond}> {this.props.ulkeisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.buttonSehir} style={styles.touchableStyle}>
                              <Text style={styles.textSecond}> {this.props.sehirisim} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.buttonIlce} style={styles.touchableStyle}>
                              <Text style={styles.textSecond}> {this.props.ilcead} </Text>
                        </TouchableOpacity>

                  </View>
            )
            if (this.props.sehirisim === this.props.ulkeisim) {//şehir ismi ile ulke ismi aynı ise şehir kısmını ekranda gösterme

                  return (<ImageBackground source={backgroundImage} style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }} >
                        <View style={styles.viewStyle} >
                              <TouchableOpacity onPress={this.buttonUlke} style={styles.touchableStyle} >
                                    <Text style={styles.textSecond}> {this.props.ulkeisim} </Text>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={this.buttonIlce} style={styles.touchableStyle}>
                                    <Text style={styles.textSecond}> {this.props.ilcead} </Text>
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
            };
            return (
                  <ImageBackground source={backgroundImage} style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }} >
                        {isimKontrol}
                        <View style={styles.buttonStyle}>
                              <Button onPress={this.buttonMain} title='Değiştir' />
                        </View>

                        <View style={styles.containerStyle}>
                              {mapGelenData}
                        </View>
                  </ImageBackground>
            );
      }
}

const styles = StyleSheet.create({
      containerStyle: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#9baef2',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: Platform.OS === 'ios' ? 50 : 40,
            alignItems: 'center',
            backgroundColor: '#e5e4e4',
      },
      subContainerStyle: {
            borderBottomWidth: 1,
            padding: 5,
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
            alignItems: 'center'
      },
      textStyle: {
            fontSize: 30,
            padding: 10,
            fontWeight: 'bold',
            alignItems: 'center',
            color: 'black',
            // textDecorationLine: 'underline',
            // textDecorationStyle: 'dotted',
            // textShadowColor: 'red',
            // lineHeight: 30
      },
      textSecond: {
            fontSize: 20,
            padding: 5,
            fontWeight: 'bold',
            alignItems: 'center',
            color: 'black',
      },
      viewStyle: {
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 10 : 1,
            padding: Platform.OS === 'ios' ? 5 : 1,
      },
      touchableStyle: {
            backgroundColor: '#e5e4e4',
            borderWidth: Platform.OS === 'ios' ? 1 : 1,
            borderRadius: 10,
            margin: 2,
            borderColor: '#9baef2',
      },
      buttonStyle: {
            marginTop: Platform.OS === 'ios' ? 2 : 20,
            alignItems: 'center',
      }
}
);


const mapStateToProps = ({ dataResponse }) => {
      const { datavakitler, ilceid, ulkeisim, ilcead, sehirisim } = dataResponse;
      return { datavakitler, ilceid, ulkeisim, ilcead, sehirisim };
};

export default connect(mapStateToProps, { dataChange })(Detay);
