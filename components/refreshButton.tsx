import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export default function RefreshButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="refresh" size={26} color="#b9c7c5" />
    </TouchableOpacity>
  );
}
