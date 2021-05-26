import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

export default function ShoppingList({displayedItems, checkItem, fresh}) {

    const [freshing, setRefreshing] =useState(false)
    return (
        <View style={styles.container}>
            <FlatList data={displayedItems}
            renderItem={({item})=>(
                <TouchableOpacity onLongPress={()=>checkItem(item)}>
                    <View style={styles.txtContainer}>
                       <Text style={item.check===false?styles.text: styles.textChecked}>{item.name}</Text>
                   </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.name}
            refreshing={freshing}
            onRefresh={fresh}
            ItemSeparatorComponent={()=><View style={styles.boundary}
            ></View>}/>
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
    textChecked:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        color: 'green',
        fontSize: 32,
        padding: 20,
        textTransform: 'capitalize'
    },
    boundary:{
        width: '100%',
        height: 2,
        backgroundColor: '#d3d4cf'
    }
});
