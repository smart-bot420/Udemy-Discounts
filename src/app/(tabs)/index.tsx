import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../../../store';


export default function App() {

  const router = useRouter();
  const getDt = new Date();
  const today = getDt.toISOString().split('T')[0];
  // const homList = ['react', 'gamedev', 'C++', 'javascript', 'python', ]

  // for (const topic of homList) {
  //   const [tpoic, settpoic] = useState([]);
  //   const reqtopic = {
  //   method:'get',
  //   url:'https://udemy-coupons-courses-instructors-data-api.p.rapidapi.com/coupons.php',
  //   params: {
  //     q : {topic},
  //     rating_gte: '4',
  //     valid_from: {today},
  //   },
  //   headers: {
  //     'x-rapidapi-key': '51ad0fb1cemsh9f858bd25ee9832p10f772jsnd73d2b43062e',
  //     'x-rapidapi-host': 'udemy-coupons-courses-instructors-data-api.p.rapidapi.com'
  //   }
  // };
  // }

  const [rct, setRct] = useState([]);
  const [gmdv, setGmdv] = useState([]);
  const [cpp, setCpp] = useState([]);
  const [c, setC] = useState([]);

  const setInfo = useStore((state) => state.setInfo)


  const reqRct = {
    method:'get',
    url:'https://udemy-coupons-courses-instructors-data-api.p.rapidapi.com/coupons.php',
    params: {
      q : 'react',
      rating_gte: '4',
      valid_from: {today},
    },
    headers: {
      'x-rapidapi-key': '51ad0fb1cemsh9f858bd25ee9832p10f772jsnd73d2b43062e',
      'x-rapidapi-host': 'udemy-coupons-courses-instructors-data-api.p.rapidapi.com'
    }
  };

  const reqGmdv = {
    method:'get',
    url:'https://udemy-coupons-courses-instructors-data-api.p.rapidapi.com/coupons.php',
    params: {
      q : 'Data Science',
      rating_gte: '3',
      valid_from: {today},
    },
    headers: {
      'x-rapidapi-key': '51ad0fb1cemsh9f858bd25ee9832p10f772jsnd73d2b43062e',
      'x-rapidapi-host': 'udemy-coupons-courses-instructors-data-api.p.rapidapi.com'
    }
  };

  const reqC = {
    method:'get',
    url:'https://udemy-coupons-courses-instructors-data-api.p.rapidapi.com/coupons.php',
    params: {
      q : 'JavaScript',
      rating_gte: '4',
      valid_from: {today},
    },
    headers: {
      'x-rapidapi-key': '51ad0fb1cemsh9f858bd25ee9832p10f772jsnd73d2b43062e',
      'x-rapidapi-host': 'udemy-coupons-courses-instructors-data-api.p.rapidapi.com'
    }
  };

  const reqCpp = {
    method:'get',
    url:'https://udemy-coupons-courses-instructors-data-api.p.rapidapi.com/coupons.php',
    params: {
      q : 'C++',
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
      const resRct = await axios.request(reqRct);
      let clnDataa = resRct.data;
      if (typeof clnDataa === 'string') {
        const start = clnDataa.indexOf('{');
        clnDataa = JSON.parse(clnDataa.slice(start));
      }
      setRct(clnDataa.items);
    } catch(error) {console.log(error)}

    try{
      const resGmdv = await axios.request(reqGmdv);
      let clnDatab = resGmdv.data;
      if (typeof clnDatab === 'string') {
        const start = clnDatab.indexOf('{');
        clnDatab = JSON.parse(clnDatab.slice(start));
      }
      setGmdv(clnDatab.items);
    } catch(error) {console.log(error)}

    try{
      const resC = await axios.request(reqC);
      let clnDatac = resC.data;
      if (typeof clnDatac === 'string') {
        const start = clnDatac.indexOf('{');
        clnDatac = JSON.parse(clnDatac.slice(start));
      }
      setC(clnDatac.items);
    } catch(error) {console.log(error)}

    try{
      const resCpp = await axios.request(reqCpp);
      let clnDatad = resCpp.data;
      if (typeof clnDatad === 'string') {
        const start = clnDatad.indexOf('{');
        clnDatad = JSON.parse(clnDatad.slice(start));
      }
      setCpp(clnDatad.items);
    } catch(error) {console.log(error)}



  }

  // useEffect(()=> {
  //   setParam('');
  // }, []);

  useEffect(() => {
    getData();

  }, [])

  const details = ((item) => {setInfo(item)});

  const Item = ({item}) => (
    <TouchableOpacity 
      style = {styles.card} 
      onPress = {() => {router.push('/details')}}>
      <Image source = {{uri: item.course.image_url}} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.course.name}</Text>
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
        horizontal
        showsHorizontalScrollIndicator = {false}
        keyExtractor={(item, index) => `${item.course.id ?? item.coupon.id ?? 'no-id'}-${index}` }
        renderItem={({item}) => <Item item={item} />}
      />
    </View>
  )



  return(
    <SafeAreaProvider>
      <SafeAreaView style = {styles.scrn} >
        <StatusBar hidden={true} />
        <ScrollView>
          <Homrow title='React Courses' data={rct} />
          <Homrow title='Data Science' data={gmdv} />
          <Homrow title='JavaScript Courses' data={c} />
          <Homrow title='C++ Courses' data={cpp} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#1e1e2e',
    borderWidth: 0.09,
    // overflow: 'hidden',
  },

  image: {
    alignSelf: 'center',
    width:215,
    height:140,
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
    marginHorizontal:6,
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