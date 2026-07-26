import { GroceryCategory, GroceryPriority, useGroceryStore } from '@/store/grocery-store';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


const categories: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const priorities: GroceryPriority[] = ["low", "medium", "high"];
const categoryIcons = {
  Produce: "leaf",
  Dairy: "cow",
  Bakery: "bread-slice",
  Pantry: "box-open",
  Snacks: "cookie-bite",
};



const PlannerFormCard = () => {

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [category, setCategory] = useState<GroceryCategory>('Produce');
  const [priority, setPriority] = useState<GroceryPriority>('medium');

  const { error, addItem } = useGroceryStore()

  const canCreate = name.trim().length > 0;

  const handleQuantityChange = (value: string) => {
    // this regex is used to remove all non-numeric characters from the input
    setQuantity(value.replace(/[^0-9]/g, ""));
  };

  const createItem = async () => {
    await addItem({
      name: name.trim(),
      category,
      priority,
      quantity: Number(quantity),
    });

    // optional
    // Alert.alert("Success", "Item created");

    // reset our form
    setName("");
    setQuantity("1");
    setCategory("Produce");
    setPriority("medium");
  };

  return (
    <View className='rounded-xl border p-4 border-secondary-foreground bg-card-foreground'>
      {/* NAME */}
      <Text className='text-m font-semibold text-foreground-dark'>Item name</Text>
      <View className='mt-2  flex-row items-center rounded-xl border p-4 border-secondary-foreground bg-card-foreground'>
        <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />
        <TextInput 
          value={name}
          onChangeText={setName}
          placeholder="Ex: Blueberries"
          className="ml-3 flex-1 text-base text-secondary"
          placeholderTextColor="#8aa397"
        />
      </View>

      {/* QUANTITY */}
      <Text className='mt-2 text-m font-semibold text-foreground-dark'>Quantity</Text>
      <View className='mt-2  flex-row items-center rounded-xl border p-4 border-secondary-foreground bg-card-foreground'>
        <FontAwesome6 name="hashtag" size={13} color="#5b7567" />
        <TextInput
          value={quantity}
          keyboardType='number-pad'
          onChangeText={handleQuantityChange}
          className="ml-3 flex-1 text-base text-secondary"
          placeholderTextColor="#8aa397"
        />
      </View>

      {/* CATEGORIES */}
      <Text className='mt-2 text-m font-semibold text-foreground-dark'>Categories</Text>
      <View className='mt-2  flex-row flex-wrap gap-2 '>
        {categories.map((option) => {
          const active = option === category;
          return (
            <Pressable key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center rounded-full px-4 py-2 ${active ? "bg-primary" : "bg-secondary"
                }`}>
              <FontAwesome6 name={categoryIcons[option]} size={12}
                color={active ? "#fff" : "#486856"} />
              <Text
                className={`ml-2 text-sm font-semibold ${active ? "text-primary-foreground" : "text-secondary-foreground"
                  }`}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* PRIORITY */}
      <Text className="mt-4 text-sm font-semibold text-foreground-dark">Priority</Text>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;
          const icon = option === "high" ? "bolt" : option === "medium" ? "compass" : "seedling";
          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-2 ${
                active ? "bg-primary" : "bg-secondary"
              }`}
            >
              <FontAwesome6 name={icon} size={12} color={active ? "#ffffff" : "#486856"} />
              <Text
                className={`mt-1 text-sm font-semibold capitalize ${
                  active ? "text-primary-foreground" : "text-secondary-foreground"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 ${
          canCreate ? "bg-primary" : "bg-muted"
        }`}
        onPress={createItem}
        disabled={!canCreate}
      >
        <FontAwesome6 name="plus" size={14} color={canCreate ? "#ffffff" : "#7a9386"} />
        <Text
          className={`ml-2 text-base font-semibold ${
            canCreate ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Add to Grocery List
        </Text>
      </Pressable>

      {error ? (
        <View className="mt-3 rounded-2xl border border-destructive-foreground bg-destructive-foreground px-3 py-2">
        <Text className="text-sm text-secondary text-center uppercase">{error}</Text>
        </View>
      ) : null}

    </View>
  )
}

export default PlannerFormCard

const styles = StyleSheet.create({})