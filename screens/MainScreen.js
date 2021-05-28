import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import SearchBar from '../components/SearchBar'
import ShoppingList from '../components/ShoppingList'
import {FontAwesome5, MaterialIcons} from '@expo/vector-icons'

export default function MainScreen({sock}) {
    
    const [searchTxt, setSearchTxt] =useState()
    const [items, setItems]= useState([])
    const [showingItems, setShowingItems]= useState(items)
    const [deleteVisible, setDeleteVisible]=useState(false)



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
            <TouchableOpacity onPress={()=>setDeleteVisible(true)}>
                <FontAwesome5 style={styles.bin} name={'trash'} size={44} color="red"/>
            </TouchableOpacity>
            <Modal transparent visible={deleteVisible}  >
                <TouchableOpacity style={styles.deleteModal} onPress={()=>setDeleteVisible(false)}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal_box}>
                                <MaterialIcons name={'clear'} size={44} style={styles.xbaby} onPress={()=>setDeleteVisible(false)}/>
                                <TouchableOpacity onPress={()=>{
                                    del()
                                    setDeleteVisible(false)
                                }}>
                                    <View style={styles.big_red_btn} >
                                        <Text style={styles.red_btn_text}>Delete List</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
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

    function del(){
        sock.emit('delete', 'del')
        setItems([])
        setShowingItems([])
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
        borderRadius: 30,
        elevation:20
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
    },
    bin:{
        marginTop: 10,
        elevation: 10
    },
    deleteModal:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_box:{
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        height: '40%',
        borderRadius: 30,
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    big_red_btn:{
        backgroundColor: 'red',
        width: 200,
        height: 200,
        borderRadius: 1000,
        justifyContent: 'center',
        elevation: 40,
        alignItems: 'center'
    },
    red_btn_text:{
        color: 'white',
        fontSize: 36
    },
    xbaby:{
        position: 'absolute',
        right:5,
        top:5
    }
});