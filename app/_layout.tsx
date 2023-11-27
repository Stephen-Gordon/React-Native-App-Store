import { Stack } from 'expo-router';
import { SessionProvider } from '../contexts/AuthContext'; 

export default function Layout() {
  return (
    <>
    <SessionProvider>
        <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0, 1)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
   
    </SessionProvider>
      
   
    </>
  );
}
