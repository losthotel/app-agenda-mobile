import React, { useState } from 'react';
import { Modal, View, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    onSave({ id: Date.now().toString(), title, time: time.toLocaleTimeString() });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ padding: 20 }}>
        <TextInput placeholder="Título do compromisso" value={title} onChangeText={setTitle} />
        <Button title="Escolher hora" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker value={time} mode="time" onChange={(e, selected) => {
            setShowPicker(false);
            if (selected) setTime(selected);
          }} />
        )}
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
}
