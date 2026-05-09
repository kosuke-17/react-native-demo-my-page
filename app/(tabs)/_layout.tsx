import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function GlassTabBarBackground() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isAndroid = Platform.OS === "android";
  const blurIntensity = Platform.select({ ios: 72, android: 56, default: 48 });

  return (
    <BlurView
      intensity={blurIntensity}
      tint={isDark ? "dark" : "light"}
      experimentalBlurMethod={isAndroid ? "dimezisBlurView" : undefined}
      blurReductionFactor={isAndroid ? 3.5 : undefined}
      style={StyleSheet.absoluteFill}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarBackground: () => <GlassTabBarBackground />,
        tabBarStyle: {
          // height: 60,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor:
            colorScheme === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.08)",
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarLabel: "ホーム",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "デザインシステム",
          tabBarLabel: "デザインシステム",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="paint-brush" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
