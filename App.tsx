import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useState} from "react";


export default function App() {
  const [pickerStateResult, setPickerStateResult] = useState(undefined);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Сейчас вы не можете загрузить фотографии", "Перейдите в настройки устройства и разрешите приложению доступ к изображениям");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log('heregoesresult', pickerResult);
    setPickerStateResult(pickerResult);
  }
  return (
    <View style={styles.container}>
      <Button title={'Change photo'} onPress={openImagePickerAsync}/>
      {pickerStateResult && <Image width={100} height={100} source={{uri: pickerStateResult.uri, width: 100, height: 100}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
