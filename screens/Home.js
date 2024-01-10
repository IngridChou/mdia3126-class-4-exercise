import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';

export default function Home({ navigation }) {

    const [data, setData] = useState();

    var apiKey = "fdd60ac6a0a2493396f8a4babb6870fe";
    var type = "tesla";
    var dateFrom = "2023-09-20";
    var dateTo = "2023-09-20";
    var sortBy = "publishedAt";
    var pageSize = 5;

    const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&apiKey=${apiKey}&pageSize=${pageSize}`;

    const GrabNews = () => {
        axios.get(url)
            .then((response) => {
                //console.log(response);
                console.clear();
                setData(response.data)
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })



    }
    return (
        <>
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.button} onPress={() => GrabNews()}>Grab Info</Text>
          {
            data && data.articles.map((d, index) => {
              return(
                <View style={styles.news} key={index}>
                  {d.urlToImage && <Image
                                    style={styles.image}
                                    width={150}
                                    height={150}
                                    source={d.urlToImage}
                                    alt="Image"
                  />}
                  <Text style={styles.author}>{d.author}</Text>
                  <Text style={styles.title}>{d.title}</Text>
                </View>
              )
            })
          }
        </View>
        </ScrollView>
      </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
    news: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    button: {
        backgroundColor: "cyan",
        borderRadius: 10,
        padding: 10
    },
    image: {
        weight: 150,
        height: 150
    },
    author: {
       fontWeight: "300"
    },
    title: {
        fontSize: 15,
        fontWeight: "700"
    }
});
