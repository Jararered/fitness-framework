import { LuGithub, LuMail } from "react-icons/lu";

const VERSION = "0.0.1";
const EMAIL = "jararered@icloud.com";
const GITHUB = "https://github.com/Jararered";
const SOURCE_CODE = "https://github.com/Jararered/fitness-framework";

export const AboutApp = () => {
    return (
        <div className="card-container flex-column">
            <div className="card-header flex-column">
                <h2>About</h2>
                <p>
                    This app is a work in progress. <br />
                    Please report any issues to the developer.
                </p>
            </div>
            <div className="card-content flex-column">
                <div className="flex-row flex-grow">
                    <div className="flex-grow">
                        <strong>Version</strong>
                    </div>
                    <div className="flex-shrink">{VERSION}</div>
                </div>
                <div className="flex-row flex-grow">
                    <div className="flex-grow">
                        <strong>Developer</strong>
                    </div>
                    <a
                        href={`mailto:${EMAIL}`}
                        className="flex-shrink"
                    >
                        Email <LuMail />
                    </a>
                </div>
                <div className="flex-row flex-grow">
                    <div className="flex-grow">
                        <strong>Github</strong>
                    </div>
                    <a
                        className="flex-shrink"
                        href={GITHUB}
                    >
                        Github <LuGithub />
                    </a>
                </div>
                <div className="flex-row flex-grow">
                    <div className="flex-grow">
                        <strong>Source Code</strong>
                    </div>
                    <a
                        className="flex-shrink"
                        href={SOURCE_CODE}
                    >
                        Github <LuGithub />
                    </a>
                </div>
            </div>
        </div>
    );
};
