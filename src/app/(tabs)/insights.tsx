import ClearCompletedButton from '@/components/insights/ClearCompletedButton'
import InsightsCategorySection from '@/components/insights/InsightsCategorySections'
import InsightsPrioritySection from '@/components/insights/InsightsProritySections'
import InsightsStatsSection from '@/components/insights/InsitghtsStatsSelection'
import UserProfile from '@/components/insights/UserProfile'
import TabScreenBackground from '@/components/TabScreenBackground'
import { ScrollView, StyleSheet } from 'react-native'

const InsightTabScreen = () => {
  return (
    <ScrollView className="flex-1 bg-foreground py-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic">
      
      <TabScreenBackground />
      <UserProfile />
      <InsightsStatsSection />
      <InsightsCategorySection />
      <InsightsPrioritySection />
      <ClearCompletedButton />
    </ScrollView>
  )
}

export default InsightTabScreen

const styles = StyleSheet.create({})