import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { param } from '../../param';

export default function App() {

  const getDt = new Date();
  const today = getDt.toISOString().split('T')[0];
  
  const [srch, setSrch] = useState([]);



  const reqQry = {
    method:'get',
    url:'https://udemy-coupons-courses-instructors-data-api.p.rapidapi.com/coupons.php',
    params: {
      q : param,
      rating_gte: '4',
      valid_from: {today},
    },
    headers: {
      'x-rapidapi-key': '51ad0fb1cemsh9f858bd25ee9832p10f772jsnd73d2b43062e',
      'x-rapidapi-host': 'udemy-coupons-courses-instructors-data-api.p.rapidapi.com'
    }
  };


  async function getData() {
    try{
      const resRct = await axios.request(reqQry);
      let clnDataa = resRct.data;
      if (typeof clnDataa === 'string') {
        const start = clnDataa.indexOf('{');
        clnDataa = JSON.parse(clnDataa.slice(start));
      }
      setSrch(clnDataa.items);
    } catch(error) {console.log(error)}


  }

  useEffect(() => {
    getData();
  }, [])

  const Item = ({item}) => (
    <TouchableOpacity 
      style = {styles.card} 
      onPress = {()=> {Linking.openURL(item.course.url_with_coupon)}}>
      <Image source = {{uri: item.course.image_url}} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.course.name}</Text>
        <Text>{item.course.authors.name}</Text>
        <Text style = {styles.author}>-{item.course.authors[0].name}</Text>
        <Text style={styles.price} > ${item.coupon.regular.price}  -{item.coupon.percent_off}%</Text>
        <Text style = {styles.other}>{item.course.rating}/5      {item.course.duration_hours} Hrs      {item.course.language}</Text>
        <Text style = {styles.other}>{item.coupon.code}</Text>
      </View>
    </TouchableOpacity>
  )

  const Homrow = ({title, data}) => (
    <View >
      <Text style={styles.title}>{title}</Text>
      <FlatList
        style={styles.rowbg}
        data={data}
        showsHorizontalScrollIndicator = {false}
        keyExtractor={(item, index) => `${item.course.id ?? item.coupon.id ?? 'no-id'}-${index}` }
        renderItem={({item}) => <Item item={item} />}
      />
    </View>
  )



  return(
    <SafeAreaProvider>
      <SafeAreaView style = {styles.scrn} >
        {/* <StatusBar hidden={true} /> */}
          <Homrow title='Search Results' data={srch} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  card: {
    flex:1,
    marginVertical:5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#1e1e2e',
    borderWidth: 0.09,
    // overflow: 'hidden',
  },

  image: {
    alignSelf: 'center',
    width:385,
    height:220,
    borderRadius:10,
    marginTop:3
  },

  title: {
    marginLeft:5,
    fontWeight:'bold',
    fontSize:30,
    color:'#868ea9',
    fontFamily:'sans-serif'
  },

  rowbg:{
    backgroundColor:'#363652',
    paddingVertical:5,
    borderRadius:5
    // borderWidth:0.2
  },

  scrn:{
    flex:1,
    backgroundColor:'#1e1e2e',
  },

  name:{
    fontSize:18,
    marginHorizontal:10,
    color:"#cdd6f4"
  },
  
    author:{
    fontSize:14,
    marginHorizontal:10,
    color:"#aab1ca"
  },

  other:{
    fontSize:10,
    color:"#aab1ca",
    margin:5,
  },

  price:{
    fontSize:18,
    fontWeight:'bold',
    color:'#79eb6c'
  }
});