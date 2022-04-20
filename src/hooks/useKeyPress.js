import { useEffect, useState } from "react";

export const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };

        const handleKeyUp = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [targetKey]);

    return keyPressed;
};