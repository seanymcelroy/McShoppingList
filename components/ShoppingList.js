import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

export default function ShoppingList({displayedItems}) {

    return (
        <View style={styles.container}>
            <FlatList data={displayedItems}
            renderItem={({item})=>(
                <TouchableOpacity>
                    <View style={styles.txtContainer}>
                       <Text style={styles.text}>{item.name}</Text>
                   </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={()=><View style={styles.boundary}></View>}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
    },
    txtContainer:{
        width: '100%'
    },
    text:{
        fontSize: 32,
        padding: 20,
        color: 'black',
        textTransform: 'capitalize'
    },
    boundary:{
        width: '100%',
        height: 2,
        backgroundColor: '#d3d4cf'
    }
});
