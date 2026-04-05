const Shape = ({ x, y, size, color, onClick }) => {
    const style = {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.1s ease-out'
    };

    return <div style={style} onClick={onClick} />;
};

export default Shape;