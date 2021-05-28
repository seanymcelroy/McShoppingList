import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import SearchBar from '../components/SearchBar'
import ShoppingList from '../components/ShoppingList'


export default function MainScreen({sock}) {
    
    const [searchTxt, setSearchTxt] =useState()
    const [items, setItems]= useState([])
    const [showingItems, setShowingItems]= useState(items)



    const updateItems= useCallback((neuItem)=>{
        setItems(oldItems=> [neuItem,...oldItems])
        setShowingItems(oldItems=> [neuItem,...oldItems])
    }, [setItems, setShowingItems]);

    
    const checkItem= useCallback((item)=>{
        setItems(oldItems=> {
            const updatedItems=[...oldItems]
            for(let it of updatedItems){
                if (it.name.toLowerCase()==item.name){
                    it.check=item.check
                }
            }
            return updatedItems
        })

        // setShowingItems(oldItems=> [neuItem,...oldItems]
    }, [setItems, setShowingItems]);

    useEffect(() => {
        // Filter data to show selected items
        sock.emit('message', 'refresh '+'blah')
        sock.on('searchText', text=>{
            console.log(text)
            setSearchTxt(text)        
        })
        
        sock.on('items', (itms)=>{
            setItems(itms)
            // Items
            // console.log(items)
            setShowingItems(alphabetize(itms))
        })
        sock.on('nuItem', nuItemName=>{
    
            console.log('yo ' + nuItemName)
            const itemz=[{'name': nuItemName, 'check': false},...items]
            
            // setItems(itemz)
            // setShowingItems(itemz)
            updateItems({'name': nuItemName, 'check': false})
    
            // const eyetems=[{'name': nuItemName, 'check': false},...items]
            // setItems(eyetems)
            
        })

        sock.on('changeStatus', text=>{
            item=JSON.parse(text)
            // console.log(item)
            checkItem(item)
            
        })

        sock.on('refresh', eyetems=>{
            setItems(alphabetize(eyetems))
            setShowingItems(alphabetize(eyetems)) 
        })
        
    }, [updateItems, checkItem]);
    

    


    useEffect(() => {
        // Filter data to show selected items
        if (searchTxt==="" || searchTxt==undefined){
            setShowingItems(items)
        }else{
            // console.log(searchTxt)
            filterItems(searchTxt)
        }
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
                <ShoppingList displayedItems={showingItems} checkItem={handleCheck} fresh={refresh}/>
            </View>
        </View>
    )

    function addItem(){
        typing("")
        if(searchTxt!= ""){
            sock.emit('message', 'add '+searchTxt)
        }
        const all_items=[{'name': searchTxt, 'check': false}, ...items]
        setItems(all_items)
    }

    function handleCheck(item){
        // console.log(item)
        let all_items=[...items]
        let showed_items=[...showingItems]
        let verdict=null
        for(let tem of all_items){
            if (tem.name.toLowerCase()==item.name.toLowerCase()){
                tem.check=!(tem.check)
                verdict=tem.check
            }
        }
        setItems(all_items)
        // setShowingItems(showed_items)
        sock.emit('message', 'check '+JSON.stringify(item))
    }

    function filterItems(str){
        if(str.length>0){
            str=str.toLowerCase()
        }
        const allItems=[...items]
        const filteredItems= allItems.filter(item=>item.name.toLowerCase().startsWith(str.toLowerCase()))
        setShowingItems(filteredItems)
    }

    function refresh(){
        // sock.emit('message', 'refresh '+'blah')
        sock.emit('message', 'refresh '+'tah')
    }
    function alphabetize(arr){
        if(arr!=null){
            // console.log(arr.sort((a, b)=>a.name<b.name?-1:1))
            return arr.sort((a, b)=>a.name.toLowerCase()<b.name.toLowerCase()?-1:1)
        }
        return arr

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
        padding: 0,
        borderWidth: 1,
        borderColor: "thistle"
    }
});