
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from 'react-native';

const PlannerHeroImage = () => {
  return (
    <View className='overflow-hidden rounded-xl border p-4 border-secondary-foreground bg-card-foreground'>
     <Image source={require("../../../assets/images/hero.png")} 
      className='w-full h-56 '
      resizeMode='cover'
      />
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0.4)", "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72 }}
      />
      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "rgba(0,0,0,0.4)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 72 }}
      />
    </View>
  )
}

export default PlannerHeroImage

const styles = StyleSheet.create({})