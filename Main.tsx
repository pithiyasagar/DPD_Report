/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//#126F3B
//#35C75A

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { increment } from "./counterSlice";

function Main() {
  const [flag, setFlag] = useState(true);

  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [productName, setProductName] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(-1);

  const [stockModalVisible, setStockModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [newStock, setNewStock] = useState("");

  const [productList, setProductList] = useState([
    // {
    //   name: "Paneer-200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Asal Idly & Dosa Batter-1kg",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Parota-450gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Chapati-200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Khova-200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Set Curd - 1kg",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Yogurt Blueberry-100gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Yogurt Strawberry -100gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Yogurt Mango -100gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cheese Slices-480gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cheese Slices-200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cheese Slices-100gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cheese Block- 200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cheese Cubes-200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cheddar Cheese - 200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Shredded Mozzarella Cheese-500gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Pizza Cheese Mozzarella Diced -200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Pizza Cheese Mozzarella - 200g",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Cooking Butter-500gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Table Butter-100gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Pizza Cheese - 200gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Butter Chiplet - 100gm",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Uht Cream - 1ltr",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Uht Cream - 250ml",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Ghee - 1Ltr",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
    // {
    //   name: "Ghee 200Ml",
    //   open: 0,
    //   close: 0,
    //   selling: 0
    // },
  ]);

  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  useEffect(() => {
    getProductList();
    getUserName();
    getStoreName();
  }, []);

  const storeProductList = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("product_list", jsonValue);
    } catch (e) {
      console.log("Error----", e);
      // saving error
    }
  };

  const getProductList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("product_list");
      if (jsonValue != null) {
        setProductList(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log("Error----", e);
      // error reading value
    }
  };

  const storeUserName = async (value) => {
    try {
      await AsyncStorage.setItem("user_name", value);
    } catch (e) {
      console.log("Error----", e);
      // saving error
    }
  };

  const getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem("user_name");
      if (value != null) {
        setName(value);
      }
    } catch (e) {
      console.log("Error----", e);
      // error reading value
    }
  };

  const storeStoreName = async (value) => {
    try {
      await AsyncStorage.setItem("store_name", value);
    } catch (e) {
      console.log("Error----", e);
      // saving error
    }
  };

  const getStoreName = async () => {
    try {
      const value = await AsyncStorage.getItem("store_name");
      if (value != null) {
        setStoreName(value);
      }
    } catch (e) {
      console.log("Error----", e);
      // error reading value
    }
  };

  function renderItems({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "white",

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,

          borderRadius: 10,
          borderColor: "grey",
          margin: 10,
          padding: 15,
        }}
      >
        <Text style={{ fontWeight: "900" }}>{item.name}</Text>
        <View
          style={{
            flex: 1,
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "900" }}>OP</Text>
          <TextInput
            style={{
              flex: 1,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
            value={item.open > 0 ? item.open + "" : ""}
            onChangeText={(text) => {
              productList[index].open = parseInt(text);
              productList[index].selling = item.close - parseInt(text);
              setProductList(productList);
              setFlag(!flag);
              // dispatch(increment())
            }}
            keyboardType="number-pad"
          />
          <Text style={{ fontWeight: "900" }}>CL</Text>
          <TextInput
            style={{
              flex: 1,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
            value={item.close > 0 ? item.close + "" : ""}
            onChangeText={(text) => {
              productList[index].close = parseInt(text);
              productList[index].selling = item.open - parseInt(text);
              setProductList(productList);
              setFlag(!flag);
            }}
            keyboardType="number-pad"
          />
          <Text style={{ fontWeight: "900" }}>SL: </Text>
          <TextInput
            style={{
              flex: 1,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
            value={item.selling > 0 ? item.selling + "" : ""}
            onChangeText={(text) => {
              productList[index].selling = parseInt(text);
              productList[index].close = item.open - parseInt(text);
              setProductList(productList);
              setFlag(!flag);
            }}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  }

  function renderHiddenItem(data, rowMap) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignSelf: "flex-end",
          margin: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#1e81b0",
            padding: 15,
            justifyContent: "center",
            borderRadius: 20,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => {
            setSelectedPosition(data.index);
            setSelectedProduct(data.item);
            setStockModalVisible(true);
          }}
        >
          <Image
            // style={{ width: 20, height: 20 }}
            source={require("./icons/add.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#22A699",
            padding: 15,
            justifyContent: "center",
            borderRadius: 20,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => {
            setSelectedPosition(data.index);
            setProductName(data.item.name);
            setModalVisible(true);
          }}
        >
          <Image
            // style={{ width: 20, height: 20 }}
            source={require("./icons/edit.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#F24C3D",
            padding: 15,
            justifyContent: "center",
            borderRadius: 20,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => {
            Alert.alert("Delete?", "", [
              { text: "No" },
              {
                text: "Yes",
                onPress: () => {
                  productList.splice(data.index, 1);
                  setProductList(productList);
                  storeProductList(productList);
                  setFlag(!flag);
                },
              },
            ]);
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("./icons/delete.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  async function onShare() {
    try {
      var message = "Promoter Name:- " + name + "\n\n";
      message += "Store Name:- " + storeName + "\n\n";
      message += "Date:- " + moment(date).format("DD/MM/YYYY") + "\n\n";
      message += "*OP/CL/SL*\n\n";

      for (i = 0; i < productList.length; i++) {
        message += "*" + productList[i].name + "*";
        message += "\n";
        message +=
          "OP- " +
          productList[i].open +
          " " +
          " CL- " +
          productList[i].close +
          " " +
          " SL- " +
          Math.abs(productList[i].selling) +
          " ";
        message += "\n\n";
      }

      const result = await Share.share({
        message: message,
      });

      storeProductList(productList);
      storeUserName(name);
      storeStoreName(storeName);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setShow(false);
    setDate(currentDate);
    setDatePicker(!datePicker);
  };

  function swap() {
    Alert.alert("Swap", "Are you sure you want to set CL == OP?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: () => {
          for (i = 0; i < productList.length; i++) {
            productList[i].open = productList[i].close;
            productList[i].selling = 0;
          }
          setProductList(productList);
          storeProductList(productList);
          setFlag(!flag);
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={{}}>
      <StatusBar
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // backgroundColor={{}}
      />
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ borderRadius: 5, backgroundColor: "#8EAC50", margin: 10 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{ padding: 10, color: "white", fontWeight: "700" }}>
            Add Product
          </Text>
        </TouchableOpacity>
        {productList.length > 0 && (
          <TouchableOpacity
            style={{ borderRadius: 5, backgroundColor: "#1B9C85", margin: 10 }}
            onPress={() => {
              swap();
            }}
          >
            <Text style={{ padding: 10, color: "white", fontWeight: "700" }}>
              Swap CL to OP
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ borderRadius: 5, backgroundColor: "#FC7300", margin: 10 }}
          onPress={() => {
            onShare();
          }}
        >
          <Text style={{ padding: 10, color: "white", fontWeight: "700" }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        {/* <Text>{count}</Text> */}

        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "900" }}>Name</Text>
          <TextInput
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "grey",
            }}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />

          <Text style={{ fontWeight: "900", marginTop: 10 }}>Store Name</Text>
          <TextInput
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "grey",
            }}
            value={storeName}
            onChangeText={(text) => {
              setStoreName(text);
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
            onPress={() => {
              setDatePicker(true);
            }}
          >
            <Text style={{ fontWeight: "900", marginTop: 10 }}>
              Change Date
            </Text>
            <Text style={{ fontWeight: "900", marginTop: 10 }}>
              {moment(date).format("DD/MM/YYYY")}
            </Text>
          </TouchableOpacity>

          {datePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onChange}
              style={{ marginTop: 10 }}
            />
          )}

          <SwipeListView
            data={productList}
            renderItem={renderItems}
            extraData={[flag]}
            style={{ marginTop: 10 }}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-180}
            previewRowKey={"0"}
            // previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 15,
            backgroundColor: "#00000090",
          }}
        >
          <View
            style={{
              backgroundColor: selectedPosition >= 0 ? "#1B9C85" : "#8EAC50",
              borderRadius: 10,
              padding: 15,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "900",
                marginTop: 10,
                alignSelf: "center",
                color: "white",
                fontSize: 25,
              }}
            >
              Add Product
            </Text>
            <Text style={{ fontWeight: "900", marginTop: 20, color: "white" }}>
              Product Name
            </Text>
            <TextInput
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "white",
                color: "white",
                padding: 5,
              }}
              value={productName}
              onChangeText={(text) => {
                setProductName(text);
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 5,
                  alignItems: "center",
                  marginTop: 20,
                  marginEnd: 5,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setProductName("");
                  setSelectedPosition(-1);
                }}
              >
                <Text style={{ margin: 15, fontWeight: "500", fontSize: 15 }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 5,
                  alignItems: "center",
                  marginTop: 20,
                  marginStart: 5,
                }}
                onPress={() => {
                  if (productName.length > 0) {
                    if (selectedPosition != -1) {
                      productList[selectedPosition].name = productName;
                      setSelectedPosition(-1);
                    } else {
                      productList.push({
                        name: productName,
                        open: 0,
                        close: 0,
                        selling: 0,
                      });
                    }
                    setProductList(productList);
                    storeProductList(productList);
                    setProductName("");
                    setModalVisible(!modalVisible);
                  }
                }}
              >
                <Text style={{ margin: 15, fontWeight: "500", fontSize: 15 }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={stockModalVisible}
        onRequestClose={() => {
          setStockModalVisible(!stockModalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 15,
            backgroundColor: "#00000090",
          }}
        >
          <View
            style={{
              backgroundColor: "#1e81b0",
              borderRadius: 10,
              padding: 15,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "900",
                marginTop: 10,
                alignSelf: "center",
                color: "white",
                fontSize: 25,
              }}
            >
              Add Stock
            </Text>
            <Text style={{ fontWeight: "900", marginTop: 20, color: "white" }}>
              Add New Stock
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "white",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "900",
                  color: "white",
                }}
              >
                {selectedProduct.open}
              </Text>

              <Text
                style={{
                  fontWeight: "900",
                  marginHorizontal: 10,
                  fontSize: 20,
                }}
              >
                +
              </Text>

              <TextInput
                style={{
                  flex: 1,
                  fontWeight: "900",
                  color: "white",
                  padding: 5,
                  textAlign: "center",
                  fontSize: 20,
                  backgroundColor: "#e28743",
                }}
                value={newStock}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  if (text.length > 0) setNewStock(text);
                  else setNewStock("0");
                }}
              />

              <Text
                style={{
                  fontWeight: "900",
                  marginHorizontal: 10,
                  fontSize: 20,
                }}
              >
                =
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 25,
                  fontWeight: "900",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {parseInt(selectedProduct.open) + parseInt(newStock)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 5,
                  alignItems: "center",
                  marginTop: 20,
                  marginEnd: 5,
                }}
                onPress={() => {
                  setNewStock("");
                  setStockModalVisible(!stockModalVisible);
                  setSelectedPosition(-1);
                }}
              >
                <Text style={{ margin: 15, fontWeight: "500", fontSize: 15 }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 5,
                  alignItems: "center",
                  marginTop: 20,
                  marginStart: 5,
                }}
                onPress={() => {
                  if (newStock.length > 0) {
                    let tempOP =
                      parseInt(selectedProduct.open) + parseInt(newStock);
                    productList[selectedPosition].open = tempOP;
                    productList[selectedPosition].selling =
                      tempOP - selectedProduct.close;
                    setNewStock("");
                    setProductList(productList);
                    storeProductList(productList);
                    setStockModalVisible(!stockModalVisible);
                  }
                }}
              >
                <Text style={{ margin: 15, fontWeight: "500", fontSize: 15 }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default Main;
