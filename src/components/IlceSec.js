import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ilceID, ilceIsim } from '../redux/actions/index';
import ilcesec from '../assets/ilcesec.jpg';


class IlceSec extends Component {
    state = {
        visible: false,
        datailce: [],
        label: ''
    };
    componentWillMount() {
        axios.get(`https://ezanvakti.herokuapp.com/ilceler?sehir=${this.props.sehirid}`)
            .then(response => this.setState({ datailce: response.data }))
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
        this.props.ilceID({
            ilceid: picked
        });
        this.props.ilceIsim({
            ilcead: label
        });
        this.setState({
            visible: false,
            label
        });
        Actions.Detay({ type: 'reset' });
    }


    render() {
        console.log('İLÇESec component');
        const { visible } = this.state;

        switch (this.props.ulkeisim) {
            case this.props.sehirisim:
                return (
                    <ImageBackground 
                    source={ilcesec} 
                    style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }} 
                    >

                        <View style={styles.viewStyle} >

                            <TouchableOpacity onPress={this.onShow} style={styles.touchableStyle}>
                                <Text style={styles.textStyle}>Şehir Seçiniz</Text>
                            </TouchableOpacity>
                            <ModalFilterPicker
                                visible={visible}
                                onSelect={this.onSelect}
                                onCancel={this.onCancel}
                                options={this.state.datailce.map((item) => (
                                    { label: item.IlceAdi, key: item.IlceID }
                                ))}
                            />

                        </View>
                    </ImageBackground>
                );
            case 'ABD':
                return (
                    <ImageBackground 
                    source={ilcesec} 
                    style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }} 
                    >

                        <View style={styles.viewStyle} >

                            <TouchableOpacity onPress={this.onShow} style={styles.touchableStyle}>
                                <Text style={styles.textStyle}>Şehir Seçiniz</Text>
                            </TouchableOpacity>
                            <ModalFilterPicker
                                visible={visible}
                                onSelect={this.onSelect}
                                onCancel={this.onCancel}
                                options={this.state.datailce.map((item) => (
                                    { label: item.IlceAdi, key: item.IlceID }
                                ))}
                            />

                        </View>
                    </ImageBackground>
                );

            case 'KANADA':
                return (
                    <ImageBackground 
                    source={ilcesec} 
                    style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }} 
                    >

                        <View style={styles.viewStyle} >

                            <TouchableOpacity onPress={this.onShow} style={styles.touchableStyle}>
                                <Text style={styles.textStyle}>Şehir Seçiniz</Text>
                            </TouchableOpacity>
                            <ModalFilterPicker
                                visible={visible}
                                onSelect={this.onSelect}
                                onCancel={this.onCancel}
                                options={this.state.datailce.map((item) => (
                                    { label: item.IlceAdi, key: item.IlceID }
                                ))}
                            />

                        </View>
                    </ImageBackground>
                );
            default:
                return (
                    <ImageBackground 
                    source={ilcesec} 
                    style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }} 
                    >

                        <View style={styles.viewStyle} >

                            <TouchableOpacity onPress={this.onShow} style={styles.touchableStyle}>
                                <Text style={styles.textStyle}>İlçe Seçiniz</Text>
                            </TouchableOpacity>
                            <ModalFilterPicker
                                visible={visible}
                                onSelect={this.onSelect}
                                onCancel={this.onCancel}
                                options={this.state.datailce.map((item) => (
                                    { label: item.IlceAdi, key: item.IlceID }
                                ))}
                            />

                        </View>
                    </ImageBackground>
                );
        }
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
    const { sehirid, ulkeisim, sehirisim } = dataResponse;
    return {
        sehirid, ulkeisim, sehirisim
    };
};

export default connect(mapStateToProps, { ilceID, ilceIsim })(IlceSec);
