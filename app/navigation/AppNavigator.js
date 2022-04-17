import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import Firebase from "../config/firebase";
import ListingEditScreen from "../screens/ListingEditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewListingButton from "./NewListingButton";
import React from "react";
import colors from "../config/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import routes from "./routes";

const Tab = createBottomTabNavigator();
const auth = Firebase.auth();

const AppNavigator = () => {
  const currentUser = auth.currentUser;
  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false, activeTintColor: colors.primary }}
    >
      <Tab.Screen
        name='Feed'
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      {!currentUser.isAnonymous && (
        <>
          <Tab.Screen
            name='ListingEdit'
            component={ListingEditScreen}
            options={({ navigation }) => ({
              tabBarButton: () => (
                <NewListingButton
                  onPress={() => navigation.navigate(routes.LISTING_EDIT)}
                />
              ),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name='plus-circle'
                  color={color}
                  size={size}
                />
              ),
            })}
          />
          <Tab.Screen
            name='Account'
            component={AccountNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name='account'
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default AppNavigator;
