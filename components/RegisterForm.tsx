
import { H4, Input, YGroup, Button, YStack,   } from 'tamagui'

import { useState } from "react";
import axios from "axios";

interface LoginForm {
    email?: string;
    password?: string;
    full_name?: string;
}
export default function RegisterForm() {
    const [form, setForm] = useState<LoginForm>();
    const [error, setError] = useState("");
 
    const handleChange = (e: any) => {
        console.log(e.target.value);
 
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
    const handleSubmit = () => {
        console.log(form);
        axios
            .post("https://festivals-api.vercel.app/api/users/register", form)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            });
    };
    return (
        <>
        
            <H4>Register</H4>

            <YStack space="$3">
                <YGroup >
                    <YGroup.Item>
                        <Input
                            size="$6" 
                            onChange={handleChange}
                            placeholder="email"
                            value={form?.email}
                            id="email"
                        />
                    </YGroup.Item>
                    <YGroup.Item>
                        <Input
                            size="$6" 
                            onChange={handleChange}
                            placeholder="full_name"
                            value={form?.full_name}
                            id="full_name"
                        />
                    </YGroup.Item>
                    <YGroup.Item>
                    <Input
                        size="$6" 
                        onChange={handleChange}
                        placeholder="password"
                        value={form?.password}
                        id="password"
                    />
                    </YGroup.Item>
                    
                    
                </YGroup>
                <Button onPress={handleSubmit}>Go</Button>

                

            </YStack>
            
        </>
    );
}
 