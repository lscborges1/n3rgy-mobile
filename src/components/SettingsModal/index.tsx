import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { ModalView, ButtonText, SettingsModalButton } from './styles';

interface SettingsModalProps {
  closeSettings: () => void;
  isVisible: boolean;
}

export function SettingsModal({
  isVisible,
  closeSettings,
}: SettingsModalProps): JSX.Element {
  const { navigate } = useNavigation();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    closeSettings();
    navigate('Landing');
  }

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <ModalView>
        <SettingsModalButton>
          <ButtonText>REFRESH CACHE</ButtonText>
          <Ionicons name="refresh-outline" size={25} />
        </SettingsModalButton>
        <SettingsModalButton
          onPress={() => {
            handleLogout();
          }}
        >
          <ButtonText>SIGN OUT</ButtonText>
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
