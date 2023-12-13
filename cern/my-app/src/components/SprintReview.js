import React from 'react';

function SprintReview({ title, content, imageUrl }) {
    return (
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid var(--accent)', borderRadius: '5px', backgroundColor: 'var(--secondary)' }}>
            <h2 style={{ color: 'var(--primary)' }}>{title}</h2>
            <p>{content}</p>
            {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', borderRadius: '5px' }} />}
            {/* Add more media elements as needed */}
        </div>
    );
}

export default SprintReview;
