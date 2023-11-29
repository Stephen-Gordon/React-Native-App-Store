
import { H4, Input, YGroup, Button, YStack,   } from 'tamagui'

import { useState } from "react";
import axios from "axios";
import { useSession } from '../contexts/AuthContext';
interface RegisterForm {
    email?: string;
    password?: string;
    full_name?: string;
}
export default function RegisterForm({setOpen}: any) {
    const [form, setForm] = useState<RegisterForm>();
    const [error, setError] = useState("");
    
    const { signIn } = useSession();

 
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
                console.log(response);
                if(response.status === 200 || response.status === 201){
                    axios.post("https://festivals-api.vercel.app/api/users/login", form)
                    .then((response: any) => {
                        signIn(
                            response.data.token,
                            JSON.stringify({
                                _id: response.data._id,
                                email: response.data.email,
                                full_name: response.data.full_name,
                            })
                        );
                        setOpen(false);
                    })
                }
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            });
    };
    return (
        <>
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
                <Button bc={"$purple10"} onPress={handleSubmit} size="$6" theme="active">
                    Create a new account
                </Button>
                

                

            </YStack>
            
        </>
    );
}
 