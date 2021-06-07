import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'

export default function ShoppingList({allItems, displayedItems, checkItem, fresh}) {

    const [freshing, setRefreshing] =useState(false)
    return (
        <View style={styles.container}>
            {allItems.length>0 &&<FlatList data={displayedItems}
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
            ></View>}/>}
            {allItems.length==0 && <View style={styles.mttxtContainer}><Text style={styles.emptyBasketTxt}>No items in Basket</Text>
            <FontAwesome5 name="shopping-basket" size={90} color="black" /></View>}
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
    },
    mttxtContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    emptyBasketTxt:{
        fontSize: 32,
        padding: 20
    }

});
