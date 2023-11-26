import { useState, useEffect } from 'react';

import axios from 'axios';
import { Button, Card, CardProps, H2, Image, Paragraph, XStack, YStack, Text } from 'tamagui'
interface App {
    _id: string;
    name: string;
    description: string;
    averageRating: number;
}
const Apps = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const getApps = async () => {
        try {
          console.log("sending")
            const response = await axios.get('https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps');
            console.log(response)
            setApps(response.data);
            console.log(apps)
        } catch (error) {
            console.error('Error:', error);
        }
        };

        getApps();
        
    }, [])
  return (
    <>
    <YStack
        flex={1}
        space="$2"
        padding="$2"
      >
     
        {apps.map((app: App, i) => {
          return (
              <Card key={i} elevate size="$4" bordered margin="$4">
                <Card.Header padded>
                  <H2>{ app.name }</H2>
                  <Paragraph theme="alt2">{ app.averageRating}</Paragraph>
                </Card.Header>
                <Card.Footer padded>
                  <XStack flex={1} />
                  <Button borderRadius="$10">Get</Button>
                </Card.Footer>
                
              </Card>

          )
      })}
      </YStack>

  
    
    </>
  );
};



export default Apps;
