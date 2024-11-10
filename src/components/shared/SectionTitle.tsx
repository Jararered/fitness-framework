import React from 'react';

interface SectionTitleProps {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
        <div className="page-title">
            <h1>{title}</h1>
        </div>
    );
};

export default SectionTitle;
