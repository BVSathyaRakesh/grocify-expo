import PlannerFormCard from '@/components/planner/PlannerFormCard'
import PlannerHeroImage from '@/components/planner/PlannerHeroImage'
import TabScreenBackground from '@/components/TabScreenBackground'
import { useGroceryStore } from '@/store/grocery-store'
import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

const PlannerTabScreen = () => {

  const { items } = useGroceryStore()

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority === "high",
  ).length;

  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <KeyboardAwareScrollView 
      bottomOffset={80}
      className='flex-1 bg-foreground py-4'
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      keyboardShouldPersistTaps='handled'
    >
      <TabScreenBackground />
      <View className='gap-5 rounded-xl border border-secondary-foreground bg-foreground/90 p-5'>
        <View className='flex-row items-start justify-between'>
          <View className='flex-1 pr-4'>
            <Text className='text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground-dark'>Grocery Planner</Text>
            <Text className='mt-1 text-3xl font-bold  tracking-[1.2px] text-foreground-dark' >Plan smarter, Shop calmer</Text>
            <Text className='text-xs font-semibold tracking-[1.2px] text-muted-foreground-dark'>Organize your next grocery run with categories,quantities, and priority one place </Text>
          </View>
          <View className=' h-12 w-12 items-center justify-center rounded-xl bg-primary-dark '>
            <FontAwesome6 name="wand-magic-sparkles" size={18} color="#ffffff" />
          </View>
        </View>
        <View className='flex-row gap-2'>
          <View className='gap-2 rounded-xl border border-secondary-foreground bg-foreground/90 p-5'>
            <Text className='text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground-dark'>Pending</Text>
            <Text className='mt-1 text-xl font-bold  text-foreground-dark' >{pendingCount}</Text>
          </View>
          <View className='gap-2 rounded-xl border border-secondary-foreground bg-foreground/90 p-5'>
            <Text className='text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground-dark'>High Priority</Text>
            <Text className='mt-1 text-xl font-bold  text-foreground-dark' >{highPriorityCount}</Text>
          </View>
          <View className='gap-2 rounded-xl border border-secondary-foreground bg-foreground/90 p-5'>
            <Text className='text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground-dark'>Units</Text>
            <Text className='mt-1 text-xl font-bold  text-foreground-dark' >{totalQuantity}</Text>
          </View>
        </View>
      </View>
      <PlannerHeroImage />
      <View className="px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground-dark">
          Build your list
        </Text>
        <Text className="mt-1 text-sm text-muted-foreground-dark">
          Add items with the right quantity, category, and urgency.
        </Text>
      </View>
      <PlannerFormCard />
    </KeyboardAwareScrollView>
  )
}

export default PlannerTabScreen

const styles = StyleSheet.create({})