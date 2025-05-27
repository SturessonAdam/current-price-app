import React, { useEffect, useState } from "react";
import { RadioGroup } from "react-native-radio-buttons-group";

export default function radioButtons() {

    const buttons = ["1", "2", "3", "4"]


    return (
        <RadioGroup
        radioButtons={buttons} 
        layout="row"
        />
    );
}