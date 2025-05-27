import React from "react";
import RadioGroup from "react-native-radio-buttons-group";

type Props = {
  selectedRegion: string;
  onChange: (value: string) => void;
};

export default function RadioButtons({ selectedRegion, onChange }: Props) {
    console.log("here")
    const createRadioButtons = (selectedId: string) => [
    { id: "1", label: "SE1", value: "1", color: "#b9c7c5", labelStyle: { color: selectedId === "1" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
    { id: "2", label: "SE2", value: "2", color: "#b9c7c5", labelStyle: { color: selectedId === "2" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
    { id: "3", label: "SE3", value: "3", color: "#b9c7c5", labelStyle: { color: selectedId === "3" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
    { id: "4", label: "SE4", value: "4", color: "#b9c7c5", labelStyle: { color: selectedId === "4" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
  ];

  return (
    <RadioGroup
      radioButtons={createRadioButtons(selectedRegion)}
      onPress={(value: string) => onChange(value)}
      selectedId={selectedRegion}
      layout="row"
    />
  );
}