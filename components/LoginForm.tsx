import { View, Text, StyleSheet, Button } from "react-native";
 
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import axios from "axios";
interface LoginForm {
    email?: string;
    password?: string;
}
export default function LoginForm() {
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
            .post("https://festivals-api.vercel.app/api/login", form)
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
            <Text>Here's the login page</Text>
            <TextInput
                style={styles.input}
                onChange={handleChange}
                placeholder="email"
                value={form?.email}
                id="email"
            />
            <TextInput
                style={styles.input}
                onChange={handleChange}
                placeholder="password"
                value={form?.password}
                id="password"
            />
            <Button
                onPress={handleSubmit}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
});