interface ContainerCardProps {
    title: string;
    description: string;
    content: React.ReactNode;
}

export const ContainerCard: React.FC<ContainerCardProps> = ({ title, description, content }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <hr />

            <div className="card-content">{content}</div>
        </div>
    );
};
