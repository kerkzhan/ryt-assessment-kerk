import { KEY_VALUES, KEYS } from "@/constants/db-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_DATA = {
  balance: {
    amount: 9999,
  },
  contacts: [
    { id: "1", name: "Lebron James" },
    { id: "2", name: "Steph Curry" },
  ],
  transactionHistory: [],
};

const resetDb = async () => {
  AsyncStorage.clear();
  await initializeDb();
};

const initializeDb = async () => {
  console.log("Initializing database");
  let values;
  try {
    // Check if any data exists
    values = await AsyncStorage.multiGet([KEYS.BALANCE, KEYS.CONTACTS, KEYS.HISTORY]);
    // Only initialize if no data exists
    if (values.some(([_, value]) => !value)) {
      await AsyncStorage.multiSet([
        [KEYS.BALANCE, JSON.stringify(INITIAL_DATA.balance)],
        [KEYS.CONTACTS, JSON.stringify(INITIAL_DATA.contacts)],
        [KEYS.HISTORY, JSON.stringify(INITIAL_DATA.transactionHistory)],
      ]);
    }

    console.log("Database initialized");
    return true;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return false;
  }
};

const setData = async <T>({ key, value }: { key: KEY_VALUES; value: T }) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error("Error saving data:", e);
    return false;
  }
};

const getData = async <T>(key: KEY_VALUES): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    console.error("Error reading data:", e);
    return null;
  }
};

export { initializeDb, setData, getData, resetDb };
