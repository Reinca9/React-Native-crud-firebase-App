import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Create, Edit, Home, SignIn, SignUp } from "./src/screens";
const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyB2DNhwtIHsigxDIfevM0f322z58EZrccQ",
  authDomain: "notes-app-react-native-ec19a.firebaseapp.com",
  projectId: "notes-app-react-native-ec19a",
  storageBucket: "notes-app-react-native-ec19a.appspot.com",
  messagingSenderId: "695974148073",
  appId: "1:695974148073:web:0233bf3a37daf50739bd78",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // useEffect( () => {
  //   signOut(auth)
  // }, [])
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return subscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00ff00" size={"large"} />
      </View>
    );
  }

  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Edit">
              {(props) => <Edit {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
