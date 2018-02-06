import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { dataChange } from '../redux/actions/index';


class Detay extends Component {
      componentWillMount = () => { //vakitler data
            axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.props.ilceid}`)
                  .then(response => this.props.dataChange({ datavakitler: response.data }))
                  .catch(error => {
                        console.log(error);
                        throw error;
                  });
      }

      render() {
            const mapGelenData = this.props.datavakitler.map((resp, id) => {
                  if (id === 0) {
                        return (<View key={id} style={styles.subcontainerStyle}> 
                        <Text style={styles.textStyle}>İmsak    -     {resp.Imsak}</Text>
                        <Text style={styles.textStyle}>Güneş    -    {resp.Gunes}</Text>
                        <Text style={styles.textStyle}>Öğle       -    {resp.Ogle}</Text>
                        <Text style={styles.textStyle}>İkindi     -     {resp.Ikindi}</Text>
                        <Text style={styles.textStyle}>Akşam   -    {resp.Aksam}</Text>
                        <Text style={styles.textStyle}>Yatsı      -     {resp.Yatsi}</Text>
                              </View>);
                  }
            });
            return (
                  <View>

                        <View style={{ alignItems: 'center', margin: 10, padding: 10 }} >
                              <Text> {this.props.ulkeisim} </Text>
                              <Text> {this.props.sehirisim} </Text>
                              <Text> {this.props.ilcead} </Text>
                        </View>
                        <View style={styles.containerStyle}>
                              {mapGelenData}
                        </View>


                  </View>
            );
      }
}

const styles = StyleSheet.create({
      containerStyle: {
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: Platform.OS === 'ios' ? 50 : 10,
            alignItems: 'center'

        
          },
          subContainerStyle: {
          borderBottomWidth: 1,
          padding: 5,
          backgroundColor: '#fff',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          borderColor: '#ddd',
          position: 'relative',
          alignItems: 'center'
        },
      textStyle: {
            fontSize: 30,
            padding: 10,
            fontWeight: 'bold',
            alignItems: 'center'

            
      }
}
);


const mapStateToProps = ({ dataResponse }) => {
      const { datavakitler, ilceid, ulkeisim, ilcead, sehirisim } = dataResponse;
      return { datavakitler, ilceid, ulkeisim, ilcead, sehirisim };
};

export default connect(mapStateToProps, { dataChange })(Detay);
