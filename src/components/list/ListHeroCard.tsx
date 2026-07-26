import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useGroceryStore } from '@/store/grocery-store';

const ListHeroCard = () => {

    const {items, loadItems} = useGroceryStore();

    useEffect(() => {
        loadItems();
    }, [loadItems]);
    const completedCount = items.filter((item) => item.purchased).length
    const pendingCount = items.length - completedCount;
    const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <View className='rounded-3xl bg-primary-dark p-5'>
       <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
        Today
      </Text>
      <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
        Your Grocery Board
      </Text>
      <Text className="mt-1 text-sm text-primary-foreground/80">
        {pendingCount} pending · {completedCount} completed
      </Text>
      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View className="h-2 rounded-full bg-secondary-foreground" style={{ width: `${completionRate}%` }} />
      </View>
    </View>
  )
}

export default ListHeroCard

const styles = StyleSheet.create({})