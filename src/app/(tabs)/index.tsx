import CompletedItems from '@/components/list/CompletedItems';
import ListHeroCard from '@/components/list/ListHeroCard';
import PendingItemCard from '@/components/list/PendingItemCard';
import TabScreenBackground from '@/components/TabScreenBackground';
import { useGroceryStore } from '@/store/grocery-store';
import { useClerk, useUser } from '@clerk/expo';
import { FlatList, useColorScheme, View } from 'react-native';

export default function Page() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const colorScheme = useColorScheme()
  const { items } = useGroceryStore();
  const pendingItems = items.filter((item) => !item.purchased);

  return (
     <FlatList
      className='flex-1 bg-foreground'
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator = {false}
      ListHeaderComponent={
        <View style={{gap:14}}>
          <TabScreenBackground />
          <ListHeroCard />
        </View>
      }
      ListFooterComponent={<CompletedItems />}
    />
   
  )
}

// First Version with items.map

// return (
//   <SafeAreaView className='flex-1 bg-foreground'>
//     <ScrollView className='flex-1 py-10'
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ padding: 20, gap: 24 }}
//     >
//       <TabScreenBackground />
//       <ListHeroCard />
//       <View className=' flex-row items-center  justify-between'>
//         <Text className='text-sm font-semibold uppercase tracking-[1px] text-primary-foreground'>Shopping Items</Text>
//         <Text className='text-sm text-primary-foreground'>{pendingItems.length} Active</Text>
//       </View>
//       {pendingItems.map((item) => (
//         <PendingItemCard key={item.id} item={item}/>
//       ) )}
//       <CompletedItems />
//     </ScrollView>
//   </SafeAreaView>
  
// )

//

