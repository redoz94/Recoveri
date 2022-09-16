import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';


import { MaterialCommunityIcons } from '@expo/vector-icons' 

function Icon({name, size=40, backgroundColor='#000', iconColor='#fff', onPress, title}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                width: size,
                height: size,
                // borderRadius: size/2,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center', 

            }}>
                <MaterialCommunityIcons name={name} color={iconColor} size={size*0.5} />
                {title && <Text>{title}</Text>}
            </View>
        </TouchableOpacity>
    );
}

export default Icon;