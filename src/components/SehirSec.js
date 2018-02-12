import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { sehirID, sehirIsim } from '../redux/actions/index';
import sehirsec from '../assets/sehirsec.jpg';


class SehirSec extends Component {
    state = {
        visible: false,
        label: '',
        datail: [],
    };

    componentWillMount = () => {
        axios.get(`https://ezanvakti.herokuapp.com/sehirler?ulke=${this.props.ulkeid}`)
            .then(response => this.setState({ datail: response.data }))
            .catch(error => {
                console.log(error);
                throw error;
            });
    }
    onCancel = () => {
        this.setState({
            visible: false
        });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked, label) => {
        this.props.sehirID({
            sehirid: picked,
        });
        this.props.sehirIsim({
            sehirisim: label,
        });
        this.setState({
            visible: false,
            label
        });
        Actions.Ilce({ type: 'reset' });
        //Ilce();
    }

    render() {
        console.log('ŞEHİRSec component');
        const { visible } = this.state;
        return (
            <ImageBackground source={sehirsec} style={{ flex: 1 }} >

                <View style={styles.viewStyle} >
                    <TouchableOpacity onPress={this.onShow} style={styles.touchableStyle}>
                        <Text style={styles.textStyle}>Şehir Seçiniz</Text>
                    </TouchableOpacity>
                    <ModalFilterPicker
                        visible={visible}
                        onSelect={this.onSelect}
                        onCancel={this.onCancel}
                        options={this.state.datail.map((item) => (
                            { label: item.SehirAdi, key: item.SehirID }
                        ))}
                    />

                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'black',
    },
    touchableStyle: {
        backgroundColor: '#e5e4e4',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
        borderRadius: 10,
    }
}
);

const mapStateToProps = ({ dataResponse }) => {
    const { ulkeid } = dataResponse;
    return {
        ulkeid
    };
};

export default connect(mapStateToProps, { sehirID, sehirIsim })(SehirSec);
