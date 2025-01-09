import { useState, useEffect } from "react";

import { Keys } from "../../interfaces/Storage";

const UserGreeting = () => {
    const localName = localStorage.getItem(Keys.UserSettings);
    const [nameState] = useState<string>(
        localName ? JSON.parse(localName).name : ""
    );

    useEffect(() => {
        localStorage.setItem(Keys.UserSettings, JSON.stringify({ name: nameState }));
    }, [nameState]);

    return (
        <h1>{nameState ? "Welcome, " + nameState : "Home"}</h1>
    );
}

export default UserGreeting;