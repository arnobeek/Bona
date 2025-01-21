import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  StatusBar,
  RefreshControl,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isCreationModalVisible, setIsCreationModalVisible] = useState(false);
  const [isJoiningModalVisible, setIsJoiningModalVisible] = useState(false);
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "SACCO 1", value: "sacco1" },
    { label: "SACCO 2", value: "sacco2" },
    { label: "SACCO 3", value: "sacco3" },
  ]);
  const [saccos, setSaccos] = useState([]);
  const [newSaccoName, setNewSaccoName] = useState("");
  const [newSaccoDescription, setNewSaccoDescription] = useState("");
  const [amount, setAmount] = useState("");

  const joinSacco = async (saccoId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sacco/join",
        {
          userId: "user_id", // Replace with actual user ID
          saccoId,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error joining SACCO:", error);
    }
  };

  const makeDeposit = async (saccoIndex, depositAmount) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sacco/deposit",
        {
          userId: "user_id", // Replace with actual user ID
          saccoId: saccos[saccoIndex].id, // Replace with SACCO ID if available
          amount: depositAmount,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error making deposit:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const createSacco = () => {
    const newSacco = {
      name: newSaccoName,
      description: newSaccoDescription,
      members: [{ role: "Chairman" }],
    };
    setSaccos([...saccos, newSacco]);
    setIsCreationModalVisible(false);
  };

  const deleteSacco = (index) => {
    const updatedSaccos = saccos.filter((_, i) => i !== index);
    setSaccos(updatedSaccos);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ margin: 5, backgroundColor: "white" }}
    >
      <StatusBar />
      {/* SACCO Features start here */}
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        {/* Create a SACCO Card */}
        <TouchableOpacity
          onPress={() => setIsCreationModalVisible(true)}
          style={{ flex: 1, marginRight: 5 }}
        >
          <View
            style={{
              backgroundColor: "#4caf50", // Green color
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              elevation: 5, // Shadow for Android
              shadowColor: "#000", // Shadow for iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
          >
            <Ionicons name="add-circle" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              Create a SACCO
            </Text>
          </View>
        </TouchableOpacity>

        {/* Join a SACCO Card */}
        <TouchableOpacity
          onPress={() => setIsJoiningModalVisible(true)}
          style={{ flex: 1, marginRight: 5 }}
        >
          <View
            style={{
              backgroundColor: "#2196f3", // Blue color
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              elevation: 5, // Shadow for Android
              shadowColor: "#000", // Shadow for iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
          >
            <Ionicons name="people" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              Join a SACCO
            </Text>
          </View>
        </TouchableOpacity>

        {/* Make a Deposit Card */}
        <TouchableOpacity
          onPress={() => setIsDepositModalVisible(true)}
          style={{ flex: 1, marginLeft: 0 }}
        >
          <View
            style={{
              backgroundColor: "#ff9800", // Orange color
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              elevation: 5, // Shadow for Android
              shadowColor: "#000", // Shadow for iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
          >
            <Ionicons name="cash" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              Make a Deposit
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* SACCO features end here */}

      {/* Sacco creation modal starts here */}
      <Modal
        visible={isCreationModalVisible}
        onRequestClose={() => setIsCreationModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
            width: 300,
            height: 350,
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: 30,
            margin: 30,
            marginTop: 150,
            padding: 30,
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Create New SACCO
          </Text>
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 30,
              padding: 15,
            }}
            placeholder="SACCO Name"
            value={newSaccoName}
            onChangeText={setNewSaccoName}
          />
          <TextInput
            style={{
              width: "100%",
              height: 100,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 30,
              padding: 15,
            }}
            placeholder="Description"
            multiline
            numberOfLines={5}
            maxLength={400}
            value={newSaccoDescription}
            onChangeText={setNewSaccoDescription}
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setIsCreationModalVisible(false)}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>CANCEL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={createSacco}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#4caf50",
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>
                  CREATE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Sacco creation modal ends here */}

      {/* Sacco joining modal starts here */}
      <Modal
        visible={isJoiningModalVisible}
        onRequestClose={() => setIsJoiningModalVisible(false)}
        animationType="slide"
        transparent={true}
        style={{ padding: 30 }}
      >
        <View
          style={{
            width: 300,
            height: 250,
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: 30,
            margin: 30,
            marginTop: 150,
            padding: 30,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Join Existing SACCO
          </Text>
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 30,
              padding: 15,
            }}
            placeholder="Enter SACCO Code"
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setIsJoiningModalVisible(false)}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>CANCEL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#2196f3",
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>JOIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Sacco joining modal ends here */}

      {/* Sacco deposit modal starts here */}
      <Modal
        visible={isDepositModalVisible}
        onRequestClose={() => setIsDepositModalVisible(false)}
        animationType="slide"
        transparent={true}
        style={{ padding: 30 }}
      >
        <View
          style={{
            width: 300,
            height: 310,
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: 30,
            margin: 30,
            marginTop: 150,
            padding: 30,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Make a Deposit
          </Text>

          {/* Dropdown for selecting SACCO */}
          <DropDownPicker
            open={open}
            value={value}
            items={saccos.map((sacco, index) => ({
              label: sacco.name, // SACCO name as dropdown label
              value: index, // SACCO index or ID as value
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={() => {}}
            placeholder="Select a SACCO"
            style={{ width: "100%", borderWidth: 2, marginTop: 30 }}
          />

          {/* Amount input box */}
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 20,
              padding: 15,
            }}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount} // Assuming you have a state variable for the amount
            onChangeText={(text) => setAmount(text)} // Update state when the user types
          />

          {/* Action buttons */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setIsDepositModalVisible(false)}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>CANCEL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (value !== null && amount) {
                  makeDeposit(value, amount); // Function to handle deposit
                } else {
                  alert("Please select a SACCO and enter an amount");
                }
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ff9800",
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>
                  DEPOSIT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sacco deposit modal ends here */}

      {/* Sacco invite modal starts here */}
      <Modal
        visible={isInviteModalVisible}
        onRequestClose={() => setIsInviteModalVisible(false)}
        animationType="slide"
        transparent={true}
        style={{ padding: 30 }}
      >
        <View
          style={{
            width: 300,
            height: 250,
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: 30,
            margin: 30,
            marginTop: 150,
            padding: 30,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Invite Member</Text>
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 30,
              padding: 15,
            }}
            placeholder="Enter Member Name"
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setIsInviteModalVisible(false)}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>CANCEL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  width: 100,
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "midnightblue",
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>
                  INVITE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Sacco invite modal ends here */}

      {/* Users' registered SACCOs information starts here */}
      <View style={{ flex: 1, width: "100%", marginTop: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>Your SACCOs</Text>
        <FlatList
          nestedScrollEnabled
          data={saccos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row", // Align content and delete button in a row
                alignItems: "center", // Center content vertically
                marginVertical: 10,
                padding: 15,
                borderRadius: 10,
                backgroundColor: "#ffffff",
                elevation: 5, // Adds shadow for Android
                shadowColor: "#000", // Shadow for iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            >
              {/* SACCO Content */}
              <View style={{ flex: 1 }}>
                {/* SACCO Name */}
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: 5,
                  }}
                >
                  {item.name}
                </Text>

                {/* SACCO Description */}
                <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>
                  {item.description}
                </Text>

                {/* Invite Members */}
                <TouchableOpacity
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    backgroundColor: "#4caf50",
                    borderRadius: 5,
                    alignSelf: "flex-start",
                  }}
                  onPress={() => setIsInviteModalVisible(true)}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Invite Members
                  </Text>
                </TouchableOpacity>

                {/* Roles or Members */}
                <FlatList
                  nestedScrollEnabled
                  data={item.members}
                  keyExtractor={(member, memberIndex) => memberIndex.toString()}
                  renderItem={({ item: member }) => (
                    <Text style={{ marginTop: 5, fontSize: 14, color: "#777" }}>
                      {member.role}
                    </Text>
                  )}
                />
              </View>

              {/* Delete Button */}
              {item.members.some((member) => member.role === "Chairman") && (
                <TouchableOpacity
                  onPress={() => deleteSacco(index)}
                  style={{
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: "#f44336",
                    borderRadius: 25,
                    elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                  }}
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
      {/* Users' registered SACCOs information ends here */}
    </ScrollView>
  );
}
