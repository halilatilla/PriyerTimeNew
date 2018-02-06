import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import { ilceID, ilceIsim } from '../redux/actions/index';

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
        Actions.Detay();
    }
   

    render() {
         console.log('İLÇESec component');
        
        const { visible, label } = this.state;
        return (
            <View style={styles.viewStyle} >

                <TouchableOpacity onPress={this.onShow}>
                    <Text style={styles.ilcesecStyle}>İlçe Seçmek İçin Tıklayınız</Text>
                </TouchableOpacity>
                <Text style={styles.secilenStyle} >{label}</Text>
                <ModalFilterPicker
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.state.datailce.map((item) => (
                        { label: item.IlceAdi, key: item.IlceID } 
                       ))}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        alignItems: 'center',
    },
    ilcesecStyle: {
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 10 : 10,
        padding: 10

    },
    secilenStyle: {
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 10 : 10,
    }
}
);

const mapStateToProps = ({ dataResponse }) => {
    const { sehirid } = dataResponse;
    return {
        sehirid
    };
};

export default connect(mapStateToProps, { ilceID, ilceIsim })(IlceSec);
