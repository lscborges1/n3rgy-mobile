import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import {
  ModalContainer,
  ModalView,
  ButtonText,
  SettingsModalButton,
} from './styles';

interface SettingsModalProps {
  closeSettings: () => void;
  refreshCache: () => void;
  isVisible: boolean;
}

export function SettingsModal({
  isVisible,
  closeSettings,
  refreshCache,
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
      <ModalContainer intensity={100} tint="dark">
        <ModalView>
          <SettingsModalButton
            onPress={() => {
              refreshCache();
            }}
          >
            <ButtonText>REFRESH DATA</ButtonText>
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
      </ModalContainer>
    </Modal>
  );
}
