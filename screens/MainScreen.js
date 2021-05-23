import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SearchBar from '../components/SearchBar'
import ShoppingList from '../components/ShoppingList'


export default function MainScreen({sock}) {
    
    const [searchTxt, setSearchTxt] =useState()
    const [items, setItems]= useState([])

    sock.on('items', (itms)=>{
        setItems(itms)
        // Items
        console.log(items)
    })

    sock.on('searchText', text=>{
        setSearchTxt(text)
        console.log(text)
    })

    sock.on('nuItem', nuItem=>{
        console.log(nuItem)
        for (let item of items) {
            if (nuItem.name.toLowerCase().trim() === item.name.toLowerCase().trim()){
                return
            }
        }
        setItems([nuItem, ...items])
    })


    useEffect(() => {
        // Filter data to show selected items
      }, [searchTxt]);
    
    function typing(text){
        setSearchTxt(text)
        sock.emit('message', 'search '+text)
    }
    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchbahr} txt={searchTxt} setTxt={typing}/>       
            <TouchableOpacity style={styles.btn} onPress={addItem}>
                <View >
                    <Text style={styles.btnText}>Add</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.listContainer}>
                <ShoppingList displayedItems={items}/>
            </View>
        </View>
    )

    function addItem(){
        const item={name: searchTxt, check: false}
        typing("")
        if(item.name!= ""){
            sock.emit('message', 'add '+JSON.stringify(item))
        }
    }

    
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f3ed',
      alignItems: 'center',
      width: '100%',
      paddingTop: 60

    },
    searchbahr:{
        width: '20%'
    },
    btn:{
        margin: 20,
        backgroundColor: 'green',
        height: 60,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    btnText:{
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    listContainer:{
        height: 450,
        width: '100%',
        padding: 0
    }
});
