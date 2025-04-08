import "./Card.css";

interface CardProps {
    title?: string;
    description?: string;
    content?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, content }) => {
    return (
        <div className="card-container">
            {title && (
                <div className="card-header">
                    <h2>{title}</h2>
                    <p className="card-description">{description}</p>
                </div>
            )}

            {content && <hr />}
            {content && <div className="card-content flex-column flex-grow">{content}</div>}
        </div>
    );
};
