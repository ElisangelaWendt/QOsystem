import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Button from "../Button";
import styles from "./styles";

interface ErrorModalProps{
  visible: boolean;
  functionOnRequestClose?: any;
  text?: string;
}

export default function ErrorModal({visible, functionOnRequestClose, text}: ErrorModalProps){
  return(
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={functionOnRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <Button title="Ok" onPress={functionOnRequestClose}/>
          </View>
        </View>
      </Modal>
  )
}