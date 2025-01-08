import { useState, useEffect } from "react";

const UserGreeting = () => {
    const [nameState, setNameState] = useState<string>('');

    useEffect(() => {
        const userPreferences = localStorage.getItem('user-preferences');
        if (userPreferences) {
            const { name } = JSON.parse(userPreferences);
            setNameState(name || '');
        }
    }, []);

    return (
        <h1>{nameState ? `Welcome, ${nameState}` : 'Home'}</h1>
    );
}

export default UserGreeting;