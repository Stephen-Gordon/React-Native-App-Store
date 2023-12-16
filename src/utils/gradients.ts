// GradientUtils.ts
import { LinearGradient } from 'expo-linear-gradient';

type Gradient = {
    colors: string[];
};

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getRandomGradient = (): Gradient => {
    const numberOfColors = Math.floor(Math.random() * 5) + 2; // Generate 2 to 6 random colors
    const colors = Array.from({ length: numberOfColors }, getRandomColor);
    return { colors };
};

export const generateRandomGradients = (count: number): Gradient[] => {
    return Array.from({ length: count }, getRandomGradient);
};
