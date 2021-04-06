import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { ModalView, ButtonText, SettingsModalButton } from './styles';

interface SettingsModalProps {
  closeSettings: () => void;
  isVisible: boolean;
}

export function SettingsModal({
  isVisible,
  closeSettings,
}: SettingsModalProps): JSX.Element {
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <ModalView>
        <SettingsModalButton>
          <ButtonText>Refresh Cache</ButtonText>
          <Ionicons name="refresh-outline" size={25} />
        </SettingsModalButton>
        <SettingsModalButton>
          <ButtonText>Sign Out</ButtonText>
          <Ionicons name="log-out-outline" size={25} />
        </SettingsModalButton>

        <TouchableOpacity
          style={{ position: 'absolute', bottom: 0, marginBottom: 15 }}
          onPress={() => {
            closeSettings();
          }}
        >
          <Ionicons name="close-outline" size={50} color="#E6173E" />
        </TouchableOpacity>
      </ModalView>
    </Modal>
  );
}
